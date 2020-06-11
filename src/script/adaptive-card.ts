import * as ACData from "adaptivecards-templating";
import * as AdaptiveCards from "adaptivecards";
import { PopupAction } from "./popup-action";
import { TruncateTextBlock } from "./truncate-textBlock";



export function cardRender(renderTemplate: string, data: string) {
    try {

        var templatePayload = JSON.parse(renderTemplate);

        var template = new ACData.Template(templatePayload);
        var context: ACData.IEvaluationContext = {
            $root: JSON.parse(data)
        };
        // var context = new ACData

        //context.$root = JSON.parse(data);
        var cardId = "CARD_1234";
        var card = template.expand(context);

        // // Render the card
        var adaptiveCard = new AdaptiveCards.AdaptiveCard();
        AdaptiveCards.AdaptiveCard.elementTypeRegistry.registerType("PopupAction", () => { return new PopupAction("Published", data); });
        // AdaptiveCards.AdaptiveCard.elementTypeRegistry.registerType("TruncateTextBlock", () => { return new TruncateTextBlock(); })
        //  AdaptiveCards.GlobalRegistry.elements.register("PopupAction", PopupAction);
        adaptiveCard.parse(card);

        adaptiveCard.onExecuteAction = onExecuteActionHandler;
        //  var additionalAction = adaptiveCard.getElementById("AdditionalAction") as AdaptiveCards.SubmitAction;
        // if(additionalAction && additionalAction.dat) {

        // }
        var htmlElement = adaptiveCard.render();
        // console.log(htmlElement);

        var div = document.createElement("div");


        // document.getElementById("result").body.appendChild(htmlElement);
        //document.body.appendChild(htmlElement);
        //document.body.appendChild(div);
        // document.getElementById("designerRootHost").style.border = "thick solid #0000FF";
        document.getElementById("designerRootHost").classList.add('recommendation-card-container');
        document.getElementById("designerRootHost").classList.add("new-card");
        document.getElementById("designerRootHost").appendChild(div);
        // div.style.border = "10px";
        //  div.classList.add('recommendation-card-container');
        div.appendChild(htmlElement);
        // div.id = "adaptive";

        // $("#designerRootHost").ready(() => {
        //     var adaptive = $(this);
        //     adaptive.addClass('highlight');
        //     setTimeout(function () { adaptive.removeClass('highlight'); },
        //         2000)
        // });




    } catch (error) {

        console.log("Fails to render the card!" + error);

    }

    //document.getElementById("textarea").textContent = sampleData;
}

function getCardsState() {

}

function onExecuteActionHandler(action: AdaptiveCards.Action) {
    document.getElementById("designerRootHost").classList.remove("new-card");
    if (action instanceof AdaptiveCards.OpenUrlAction) {
        const act = action as AdaptiveCards.OpenUrlAction;
        console.log("URL is: " + act.url);
        if (act.url) {
            window.open(act.url.toString());
        }
        //alert(JSON.stringify(action.url));
    }
    if (action instanceof AdaptiveCards.SubmitAction) {
        alert("Action submitted!!!! " + action.title);
    }
    // if (action instanceof AdaptiveCards.A) {
    //     const submit = action as AdaptiveCards.SubmitAction;
    //     if (submit.id == "AdditionalAction") {

    //         var el: HTMLDivElement = document.createElement("div");
    //         el.id = "myDropdown";
    //         el.className = "dropdown-content";

    //         var btn1 = document.createElement("button");
    //         btn1.innerHTML = "Action Button";

    //         var btn2 = document.createElement("button");
    //         btn2.innerHTML = "Action Button 2";

    //         // var p1 = document.createElement("p");
    //         // p1.innerHTML = "Action 1";
    //         //var p2 = document.createElement("p");
    //         //p2.innerHTML = "Action 2";
    //         // el.append(p1);
    //         // el.append(p2);

    //         btn1.addEventListener('click', onClickButtonEventHandler.bind(this))
    //         el.append(btn1);
    //         el.append(btn2);

    //         // el.style.color = "black"
    //         // el.style.height = "100px";
    //         // el.style.width = "100px";


    //         action.parent.parent.renderedElement.style.position = "relative";
    //         action.parent.renderedElement.style.display = "inline-block";

    //         el.classList.toggle("show");
    //         el.style.zIndex = "1";
    //         el.style.backgroundColor = "yellow";
    //         el.style.position = "absolute";
    //         el.style.boxShadow = "0px 8px 16px 0px rgba(0,0,0,0.2)";
    //         el.style.display = "flex";
    //         el.style.flexDirection = "column";
    //         action.parent.renderedElement.append(el);
    //         var style = `<style id="smartassist-style">
    //         .dropdown-content {
    //             display: none;
    //             position: absolute;
    //             background-color: #f1f1f1;
    //             min-width: 160px;
    //             box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    //             z-index: 1;
    //           }

    //           .show {display:block;}
    //     </style>
    //     `;
    //         //  $("#dropdown-content").html(style);
    //         // console.log("Appending Child");
    //         // var h1 = document.crea
    //         // action.parent.renderedElement.append("<span>Popup text...</span>");
    //         //const popupActions = submit.data.actions;
    //         // ReactDOM.render(
    //         //     <Popup />,
    //         //     action.parent.renderedElement
    //         // );
    //         //   alert("I am here");
    //     }
    // }
}

function onClickButtonEventHandler(btn: HTMLButtonElement, evt: MouseEvent) {
    alert("Removing Element");
    //btn.parentElement.parentElement.remo;
    // evt.target.parentElement.remove();
}
async function getDataJSON(): Promise<any> {

    const response = await fetch('https://org355d41b6.crm.dynamics.com/api/data/v9.0/incidents(9c979031-3b14-43ae-bf0e-06e2ca3922be)',
        {
            method: 'GET',
            credentials: "include"
        });
    if (response.ok) {
        return response.json();
    }
    else {
        console.log("status code" + response.status.toString())
        return "Error";
    }
}
// const markdown = new MarkDown();
// var card = {
//     "type": "AdaptiveCard",
//     "version": "1.0",
//     "body": [
//         {
//             "type": "TextBlock",
//             "text": "Hello"
//         },
//         {
//             "type": "TextBlock",
//             "text": "Hello Adaptive Cards!"
//         }
//     ],
//     "actions": [
//         {
//             "type": "Action.OpenUrl",
//             "title": "Learn more",
//             "url": "http://adaptivecards.io"
//         },
//         {
//             "type": "Action.OpenUrl",
//             "title": "GitHub",
//             "url": "http://github.com/Microsoft/AdaptiveCards"
//         }
//     ]
// };

// // Create an AdaptiveCard instance
// var adaptiveCard = new AdaptiveCards.AdaptiveCard();


// // Set its hostConfig property unless you want to use the default Host Config
// // Host Config defines the style and behavior of a card
// adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
//     fontFamily: "Segoe UI, Helvetica Neue, sans-serif"
//     // More host config options
// });

// // Set the adaptive card's event handlers. onExecuteAction is invoked
// // whenever an action is clicked in the card
// adaptiveCard.onExecuteAction = function(action) { alert("Ow!"); }

// // Parse the card payload
// adaptiveCard.parse(card);

// // Render the card to an HTML element:
// var renderedCard = adaptiveCard.render();

// // And finally insert it somewhere in your page:
// document.body.appendChild(renderedCard); 
// //document.body.innerHTML = "Some content";

//module.exports = cardRender;
