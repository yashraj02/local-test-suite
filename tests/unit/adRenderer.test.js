const AdRenderer = require('../../src/adRenderer');

describe('AdRenderer', () => {
  let mockGptManager;
  let mockPrebidManager;
  let adRenderer;

  beforeEach(() => {
    mockGptManager = {
      displayAd: jest.fn(),
    };
    mockPrebidManager = {
      requestBids: jest.fn(),
    };
    adRenderer = new AdRenderer(mockGptManager, mockPrebidManager);
  });

  test('should successfully render an ad when all dependencies work', async () => {
    mockPrebidManager.requestBids.mockResolvedValue(true);
    mockGptManager.displayAd.mockResolvedValue(true);

    const result = await adRenderer.renderAd('test-ad-unit', [300, 250]);

    expect(result).toBe(true);
    expect(mockPrebidManager.requestBids).toHaveBeenCalledWith('test-ad-unit');
    expect(mockGptManager.displayAd).toHaveBeenCalledWith(
      'test-ad-unit',
      [300, 250]
    );
  });

  test('should handle errors gracefully', async () => {
    mockPrebidManager.requestBids.mockRejectedValue(new Error('Prebid failed'));

    const result = await adRenderer.renderAd('test-ad-unit', [300, 250]);

    expect(result).toBe(false);
  });
});
