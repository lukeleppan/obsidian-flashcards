import { Plugin, WorkspaceLeaf } from "obsidian";
import { VIEW_TYPE_FLASHCARDS } from "./constants";

export default class ObsidianFlashCards extends Plugin {
  onload() {}

  onunload() {
    this.app.workspace
      .getLeavesOfType(VIEW_TYPE_FLASHCARDS)
      .forEach((leaf) => leaf.detach());
  }
}
