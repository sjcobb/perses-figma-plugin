figma.showUI(__html__, { width: 600, height: 350 });

const selection = figma.currentPage.selection;
if (selection) {
  if (selection.length === 1) {
    const width = selection[0].width;
    const height = selection[0].height;

    figma.ui.postMessage({
      type: "has-selection",
      message: { width: width, height: height },
    });
  }
}

figma.ui.onmessage = (msg) => {
  if (msg.type === "insert-svg") {
    const svg = figma.createNodeFromSvg(`${msg.svg}`);
    figma.currentPage.appendChild(svg);
  }
  if (msg.type === "create-rectangles") {
    const nodes = [];

    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);

    // This is how figma responds back to the ui
    figma.ui.postMessage({
      type: "create-rectangles",
      message: `Created ${msg.count} Rectangles`,
    });
  }

  //figma.closePlugin();
};
