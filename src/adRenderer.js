class AdRenderer {
  constructor(gptManager, prebidManager) {
    this.gptManager = gptManager;
    this.prebidManager = prebidManager;
  }

  async renderAd(adUnit, size) {
    try {
      // Wait for prebid auction
      await this.prebidManager.requestBids(adUnit);

      // Render GPT ad
      const success = await this.gptManager.displayAd(adUnit, size);
      return success;
    } catch (error) {
      console.error('Error rendering ad:', error);
      return false;
    }
  }
}

module.exports = AdRenderer;
