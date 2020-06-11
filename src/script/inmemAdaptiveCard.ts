import * as ACData from "adaptivecards-templating";
import * as AdaptiveCards from "adaptivecards";
import { OpenUrlAction } from "adaptivecards";
//import axios from 'axios';
//import * as MarkDown from "markdown-it";



export function cardRender(renderTemplate: string, data: string) {
    try {

        var adaptiveCard = new AdaptiveCards.AdaptiveCard();
        var container = new AdaptiveCards.Container();

        const dataPayLoad = JSON.parse(data);
        var factSet = new AdaptiveCards.FactSet();
        var factArray = [];
        for (var key in dataPayLoad) {
            if (dataPayLoad.hasOwnProperty(key)) {
                var fact = new AdaptiveCards.Fact();
                fact.name = key.toString();
                fact.value = dataPayLoad[key];
                factArray.push(fact);
            }
        }
        factSet.facts = factArray;
        container.addItem(factSet);

        adaptiveCard.addItem(container);
        // adaptiveCard.parse(card);

        //  adaptiveCard.onExecuteAction = onExecuteActionHandler;
        var htmlElement = adaptiveCard.render();
        // console.log(htmlElement);


        // document.getElementById("result").body.appendChild(htmlElement);
        document.body.appendChild(htmlElement);
    } catch (error) {

        console.log("Fails to render the card!" + error);

    }

    //document.getElementById("textarea").textContent = sampleData;
}

function onExecuteActionHandler(action: AdaptiveCards.Action) {
    if (action instanceof OpenUrlAction) {
        const act = <OpenUrlAction>action;
        console.log("URL is: " + act.url);
        if (act.url) {
            window.open(act.url.toString());
        }
        //alert(JSON.stringify(action.url));
    }
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
