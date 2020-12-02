<script lang="ts">
  import type { Vault } from "obsidian";
  import type { flashcard } from "./flashcard";
  import { FlashcardGenerator } from "./flashcard-generator";
  import { onDestroy, onMount } from "svelte";

  export let vault: Vault;
  let flashcards: flashcard[] = [];

  vault.getName();

  async function generateCards(): Promise<void> {
    const flashcardGenerator: FlashcardGenerator = new FlashcardGenerator(
      vault
    );
    this.flashcards = flashcardGenerator.generateFlashcards();
  }

  async function loadCards(): Promise<void> {
    const flashcardGenerator: FlashcardGenerator = new FlashcardGenerator(
      vault
    );
    this.flashcard = flashcardGenerator.loadCards();
  }

  onMount(() => {
    this.loadCards();
  });

  onDestroy(() => {});
</script>

<style>
  .container {
    --color-background-heading: transparent;
    --color-background-day: transparent;
    --color-background-day-empty: var(--background-secondary-alt);
    --color-background-day-active: var(--interactive-accent);
    --color-background-day-hover: var(--interactive-hover);
    --color-dot: var(--text-muted);
    --color-arrow: currentColor;
    --color-text-title: var(--text-normal);
    --color-text-heading: var(--text-normal);
    --color-text-day: var(--text-normal);
    --color-text-today: var(--text-accent);
  }

  .container {
    overflow-y: auto;
    padding: 0 16px;
  }

  .title {
    color: var(--color-text-title);
    margin-right: 4px;
    text-align: left;
  }

  .sync-button {
    align-self: right;
  }
</style>

<div id="flashcards-container" class="container">
  <div class="header">
    <h2 class="title">Flashcards</h2>
    <button class="sync-button" on:click={generateCards}>Generate Flashcards</button>
  </div>
  <hr class="solid" />
  {#if !(flashcards === [])}
    {#each flashcards as flashcard, i}
      <div class="card">
        <h4 class="title">{flashcard.shown}</h4>
        <p>{flashcard.hidden}</p>
      </div>
    {/each}
  {/if}
</div>
