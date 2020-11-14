import { Plugin, WorkspaceLeaf } from "obsidian";
import { VIEW_TYPE_FLASHCARDS } from "./constants";
import FlashcardsView from "./view";

export default class ObsidianFlashCards extends Plugin {
  private view: FlashcardsView;

  onload() {
    this.registerView(
      VIEW_TYPE_FLASHCARDS,
      (leaf: WorkspaceLeaf) => (this.view = new FlashcardsView(leaf))
    );

    this.addRibbonIcon("any-key", "Open Flashcards", () => {
      this.initLeaf();
    });

    this.addCommand({
      id: "show-flashcard-view",
      name: "Open view",
      checkCallback: (checking: boolean) => {
        if (checking) {
          return (
            this.app.workspace.getLeavesOfType(VIEW_TYPE_FLASHCARDS).length ===
            0
          );
        }
        this.initLeaf();
      },
    });
  }

  onunload() {
    this.app.workspace
      .getLeavesOfType(VIEW_TYPE_FLASHCARDS)
      .forEach((leaf) => leaf.detach());
  }

  initLeaf() {
    if (this.app.workspace.getLeavesOfType(VIEW_TYPE_FLASHCARDS).length) {
      return;
    }
    this.app.workspace.getUnpinnedLeaf().setViewState({
      type: VIEW_TYPE_FLASHCARDS,
    });
  }
}
