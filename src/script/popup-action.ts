import * as Adaptive from "adaptivecards";
//import { AdaptiveCard } from "adaptivecards";

export class PopupAction extends Adaptive.CardElement {

    private _owner: HTMLElement;
    private _renderedItems: HTMLElement;
    private _overlayElement: HTMLElement;
    private _actionElement: HTMLElement;
    private _popupElement: HTMLElement;
    private _isOpen: boolean = false;
    private _conditionForActions: string;
    // private _items: Array<Adaptive.Action>;
    private _actionSet: Adaptive.ActionSet;
    private _popupActionSetContainer: Adaptive.Container;
    private _actionItems: Array<any>;
    private _image: string;
    private data: any;
    //   private _overlayElement: HTMLElement;

    constructor(conditionForAction: string, data: any) {
        super();
        this._conditionForActions = conditionForAction;
        this.data = data;
        this._popupActionSetContainer = new Adaptive.Container();
        this._popupActionSetContainer.id = "ac-popupAction";
    }

    protected internalRender(): HTMLElement {

        let imageBox = new Adaptive.Image();
        imageBox.url = this._image;
        imageBox.size = Adaptive.Size.Small;
        imageBox.pixelWidth = 20;
        imageBox.pixelHeight = 20;
        imageBox.horizontalAlignment = Adaptive.HorizontalAlignment.Right;
        this._owner = imageBox.render();


        //let container = new Adaptive.Container();
        // container.id = "ac-popupAction";
        // container.addItem(this._actionSet);
        // container.addItem(this._popupActionSet);

        var element = document.createElement("div");
        element.className = "ms-ctrl ms-ctrl-popup-container";


        element.style.border = "1px solid #EEEEEE";
        element.style.backgroundColor = "white";
        element.style.position = "absolute";
        element.style.boxShadow = "0 0 15px -5px rgba(0, 0, 0, 0.4)";

        this._actionElement = this._popupActionSetContainer.render();
        //(<HTMLElement>this._actionElement.getElementsByClassName("ac-actionSet")[0]).style.flexDirection = "column";
        // (<HTMLElement>this._actionElement.getElementsByClassName("ac-actionSet")[0]).style.margin = "0px 40px 0px 10px";
        //   actionSet.renderedElement.style.flexDirection = "column";
        this.setPopupStyleForActions();
        // this._actionElement.style.flexDirection = "column";
        element.append(this._actionElement);
        // element.appendChild(actionSet.render());
        this._renderedItems = element;

        //const allActions = this._popupActionSetContainer.
        //console.log("Action count: " + allActions);
        // for (let i = 0; i < this._popupActionSet.getActionCount(); i++) {
        //     var action = this._popupActionSet.getActionAt(i);
        //     action.onExecute = this.onExecuteAction.bind(this);
        // }

        this._owner.onclick = (e) => {

            if (this._isOpen) {
                this.closePopup(true);
            }
            else {
                this.popup(this._owner);
            }

            // this.popup1(this._owner);

        };

        return this._owner;
    }

    setPopupStyleForActions() {
        //  (<HTMLElement>this._actionElement.getElementsByClassName("ac-actionSet")[0]).style.flexDirection = "column";
        // const noOfActions = this._actionElement.getElementsByClassName("ac-actionSet")[0].getElementsByClassName("ac-pushButton").length;
        // let actions = this._actionElement.getElementsByClassName("ac-actionSet")[0].getElementsByClassName("ac-pushButton");
        // for (let i = 0; i < noOfActions; i++) {
        //     let action = <HTMLElement>actions[i];
        //     action.style.margin = "5px 40px 5px 10px";
        // }

        let allActions = this._actionElement.getElementsByClassName("ac-pushButton");
        const length = allActions.length;
        for (let i = 0; i < length; i++) {
            let action = <HTMLElement>allActions[i];
            action.style.margin = "5px 40px 5px 10px";
        }
        console.log("Length is : " + length);
    }

    onExecuteAction(action: Adaptive.Action) {
        if (action instanceof Adaptive.SubmitAction) {
            if (action.data && (<any>action.data).CustomParameters)
                alert("PopupAction Triggered" + JSON.stringify((<any>action.data).CustomParameters));
            alert("PopupAction Triggered");
            this.closePopup(false);
        }
        if (action instanceof Adaptive.OpenUrlAction) {
            window.open(action.url.toString());
        }

    }

    getScrollX(): number {
        return window.pageXOffset;
    }

    getScrollY(): number {
        return window.pageYOffset;
    }

    renderPopup(rootElementBounds: ClientRect) {
        this._renderedItems.style.minWidth = (rootElementBounds.width / 3) + "px";
        return this._renderedItems;
    }

    closePopup(wasCancelled: boolean) {
        if (this._isOpen) {
            document.body.removeChild(this._overlayElement);

            this._isOpen = false;

            // if (this.onClose) {
            //     this.onClose(this, wasCancelled);
            // }
        }
    }

    popup(rootElement: HTMLElement) {
        if (!this._isOpen) {
            this._overlayElement = document.createElement("div");
            this._overlayElement.className = "ms-ctrl-overlay";
            this._overlayElement.tabIndex = 0;
            this._overlayElement.style.display = "flex";
            this._overlayElement.style.flexDirection = "column";
            // this._overlayElement.style.boxShadow = "0px 0px 1px rgba(0, 0, 0, 0.18), 0px 2px 4px rgba(0, 0, 0, 0.12)";
            this._overlayElement.style.width = document.documentElement.scrollWidth + "px";
            this._overlayElement.style.height = document.documentElement.scrollHeight + "px";
            this._overlayElement.onfocus = (e) => {
                this.closePopup(true);
                // e.stopPropagation();
            };

            this._overlayElement.style.position = "absolute";
            this._overlayElement.style.left = "0";
            this._overlayElement.style.top = "0";
            this._overlayElement.style.zIndex = "10000";
            // this._overlayElement.onfocus = (e) => { this.closePopup(true); };

            document.body.appendChild(this._overlayElement);
            var rootElementBounds = rootElement.getBoundingClientRect();

            this._popupElement = this.renderPopup(rootElementBounds);

            this._overlayElement.appendChild(this._popupElement);

            var popupElementBounds = this._popupElement.getBoundingClientRect();

            var availableSpaceBelow = window.innerHeight - rootElementBounds.bottom;
            var availableSpaceAbove = rootElementBounds.top;
            var availableSpaceRight = window.innerWidth - rootElementBounds.left;
            var availableSpaceRight = window.innerWidth - rootElementBounds.right;
            var availableSpaceLeft = rootElementBounds.left;

            var left = rootElementBounds.left + this.getScrollX();
            var top;

            if (availableSpaceAbove < popupElementBounds.height && availableSpaceBelow < popupElementBounds.height) {
                // Not enough space above or below root element
                var actualPopupHeight = Math.min(popupElementBounds.height, window.innerHeight);

                this._popupElement.style.maxHeight = actualPopupHeight + "px";

                if (actualPopupHeight < popupElementBounds.height) {
                    top = this.getScrollY();
                }
                else {
                    top = this.getScrollY() + rootElementBounds.top + (rootElementBounds.height - actualPopupHeight) / 2;
                }

                if (availableSpaceLeft < popupElementBounds.width && availableSpaceRight < popupElementBounds.width) {
                    // Not enough space left or right of root element
                    var actualPopupWidth = Math.min(popupElementBounds.width, window.innerWidth);

                    this._popupElement.style.maxWidth = actualPopupWidth + "px";

                    if (actualPopupWidth < popupElementBounds.width) {
                        left = this.getScrollX();
                    }
                    else {
                        left = this.getScrollX() + rootElementBounds.left + (rootElementBounds.width - actualPopupWidth) / 2;
                    }
                }
                else {
                    // Enough space on the left or right of the root element
                    if (availableSpaceRight >= popupElementBounds.width) {
                        left = this.getScrollX() + rootElementBounds.right;

                        this._popupElement.classList.add("ms-ctrl-slide", "ms-ctrl-slideLeftToRight");
                    }
                    else {
                        left = this.getScrollX() + rootElementBounds.left - popupElementBounds.width;

                        this._popupElement.classList.add("ms-ctrl-slide", "ms-ctrl-slideRightToLeft");
                    }
                }
            }
            else {
                // Enough space above or below root element
                if (availableSpaceBelow >= popupElementBounds.height) {
                    top = this.getScrollY() + rootElementBounds.bottom;

                    this._popupElement.classList.add("ms-ctrl-slide", "ms-ctrl-slideTopToBottom");
                }
                else {
                    top = this.getScrollY() + rootElementBounds.top - popupElementBounds.height

                    this._popupElement.classList.add("ms-ctrl-slide", "ms-ctrl-slideBottomToTop");
                }

                if (availableSpaceRight < popupElementBounds.width) {
                    left = this.getScrollX() + rootElementBounds.right - popupElementBounds.width;
                }
            }

            left = rootElementBounds.right - popupElementBounds.width;
            this._popupElement.style.left = left + "px";

            // this._popupElement.style.left = left + "px";
            this._popupElement.style.top = top + "px";
            this._isOpen = true;
        }

        //  this._popupElement.focus();
    }

    getJsonTypeName(): string {
        return "PopupAction";
    }

    parse(json: any, errors?: Array<Adaptive.IValidationError>) {
        try {
            this._actionItems = json.items;
            this._image = json.image;

            for (let item of this._actionItems) {

                // var firstvariable = "{";
                // var secondvariable = "}";


                // console.log("Test is " + test);
                // var regExString = new RegExp("(?:" + firstvariable + ")((.[\\s\\S]*))(?:" + secondvariable + ")", "ig"); //set ig flag for global search and case insensitive
                // let condition;
                // var testRE = regExString.exec(test).toString();
                // if (testRE && testRE.length > 1) //RegEx has found something and has more than one entry.
                // {
                //     condition = this.data[testRE];

                // }
                if (item && ((item.hasOwnProperty('$when') && item['$when']) || !item.hasOwnProperty('$when'))) {
                    let actionSet = new Adaptive.ActionSet();
                    actionSet.parse(item.actionset, errors);
                    actionSet.orientation = Adaptive.Orientation.Vertical;
                    for (let i = 0; i < actionSet.getActionCount(); i++) {
                        var action = actionSet.getActionAt(i);
                        action.onExecute = this.onExecuteAction.bind(this);
                    }
                    this._popupActionSetContainer.addItem(actionSet);
                }
            }
        } catch (error) {
            console.log("Found Error");
        }

    }
}