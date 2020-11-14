import { FileView, TFile, ItemView, WorkspaceLeaf } from "obsidian";

import type Flashcards from "./Flashcards.svelte";
import { VIEW_TYPE_FLASHCARDS, VIEW_ICON } from "./constants";

export default class FlashcardsView extends ItemView {
  public flashcards: Flashcards;
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE_FLASHCARDS;
  }

  getDisplayText() {
    return "Flashcards";
  }

  getIcon() {
    return VIEW_ICON;
  }

  onClose() {
    if (this.flashcards) {
      this.flashcards.$destroy();
    }
    return Promise.resolve();
  }
}
