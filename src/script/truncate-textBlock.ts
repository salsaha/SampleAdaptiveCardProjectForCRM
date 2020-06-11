import * as Adaptive from "adaptivecards";

export class TruncateTextBlock extends Adaptive.TextBlock {

    private _rcomputedLineHeight: number;

    getJsonTypeName(): string {
        return "TruncateTextBlock";
    }

    protected internalRender(): HTMLElement {
        let element = super.internalRender();

        let lineHeights = this.hostConfig.lineHeights;
        // const computedLineHeight = lineHeights.default;
        const computedLineHeight = this.getFontSize(this.hostConfig.getFontTypeDefinition(this.fontType)) * 1.33;
        this._rcomputedLineHeight = computedLineHeight;
        if (this.wrap) {
            //element.style.wordWrap = "break-word";

            if (this.maxLines > 0) {
                element.style.maxHeight = (computedLineHeight * this.maxLines) + "px";
                // element.style.whiteSpace = "pre-wrap";
                element.style.overflow = "hidden";
                // this.truncateOverflow((computedLineHeight * this.maxLines));
                //  element.style.width = "calc (80%)";
                // element.style.textOverflow = "ellipsis";
                // element.style.maxInlineSize = this.maxLines.toString();
                // element.style.content = "...";
                // element.innerHTML = element.innerHTML + "..see more";

            }
        }

        return element;
    }

    updateLayout(processChildren: boolean = false) {
        super.updateLayout(processChildren);
    }

    render(): HTMLElement {
        var renderedElement = super.render();
        const maxHeight = (this._rcomputedLineHeight * this.maxLines);
        // super.updateLayout();
        this.truncateOverflow(maxHeight);
        return renderedElement;
    }
}