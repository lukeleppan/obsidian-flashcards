import type { Vault, TFile } from "obsidian";
import type { flashcard } from "./flashcard";
import fs from "fs";

export class FlashcardGenerator {
  private vault: Vault;
  public flashcards: flashcard[] = [];

  constructor(vault: Vault) {
    this.vault = vault;
  }

  async generateFlashcards() {
    const adapter: any = this.vault.adapter;
    const tagRegex: RegExp = /(( |\n)#flashcard(\s|\n))/g;
    const path =
      adapter.basePath +
      "/.obsidian/plugins/obsidian-flashcards/flashcards.json";

    let files: TFile[] = this.vault.getMarkdownFiles();
    await files.forEach(async (file: TFile) => {
      const contents = await this.vault.cachedRead(file);
      if (contents.match(tagRegex)) {
        const sections: string[] = contents.split("---");
        sections.forEach((section: string) => {
          if (section.match(tagRegex)) {
            // Get shown string
            const shownRegex: RegExp = /.*(( |\n)#flashcard(\s|\n))/;
            let shown: string = section.match(shownRegex)[0];
            shown = shown.substring(0, shown.length - 12);

            // Get hidden string
            let size: number = section.split("\n")[1].length;
            let hidden: string = section.substring(size + 2);

            // Get tags
            let tags: string[] = section.match(/\B(\#[a-zA-Z]+\b)(?!;)/g);

            let flashcard: flashcard = {
              shown: shown,
              hidden: hidden,
              tags: tags,
            };

            this.flashcards.push(flashcard);
          }
        });
      }
    });

    const json: string = JSON.stringify({
      flashcards: this.flashcards,
    });
    fs.writeFileSync(path, json, { flag: "w+" });

    return this.flashcards;
  }

  async loadCards(): Promise<flashcard[]> {
    const adapter: any = this.vault.adapter;
    const path =
      adapter.basePath +
      "/.obsidian/plugins/obsidian-flashcards/flashcards.json";

    JSON.parse(fs.readFileSync(path, "utf-8"));

    return this.flashcards;
  }
}
