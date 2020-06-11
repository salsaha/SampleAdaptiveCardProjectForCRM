// import * as monaco from "monaco-editor";
// import * as markdownit from "markdown-it";
// import * as ACDesigner from "adaptivecards-designer";
// import * as Adaptive from "adaptivecards";
// import { ProgressBar } from "./progress-bar";
// //import {TextBlockSample} from "./textblock-sample";

// // if you want to bundle the designer CSS using something like mini-css-loader:
// import "adaptivecards-designer/dist/adaptivecards-designer.css";
// import { TextBlockSample, TextBlockSamplePeer } from "./textblock-sample";

// // Uncomment below if you choose to pass an empty hostContainers array
// //import "adaptivecards-designer/dist/adaptivecards-defaulthost.css";

// window.onload = function () {

//     ACDesigner.CardDesigner.onProcessMarkdown = (text, result) => {
//         //  result.outputHtml = new markdownit().render(text);
//         result.outputHtml = text;
//         result.didProcess = true;
//     }

//     ACDesigner.GlobalSettings.enableDataBindingSupport = true;
//     ACDesigner.GlobalSettings.showSampleDataEditorToolbox = true;
//     ACDesigner.GlobalSettings.showVersionPicker = true;

//     let hostContainers: any[] = [];

//     // Optional: add the default Microsoft Host Apps (see docs below)
//     hostContainers = ACDesigner.defaultMicrosoftHosts;



//     //  Adaptive.AdaptiveCard.elementTypeRegistry.registerType("ProgressBar", () => { return new ProgressBar(); });

//     let designer = new ACDesigner.CardDesigner(hostContainers);

//     // Adaptive.AdaptiveCard.elementTypeRegistry.unregisterType("TextBlock");
//     // ACDesigner.CardDesignerSurface.cardElementPeerRegistry.unregisterPeer(Adaptive.TextBlock);

//     // Adaptive.AdaptiveCard.elementTypeRegistry.registerType("TextBlock", () => { return new TextBlockSample() })

//     // Adaptive.AdaptiveCard.elementTypeRegistry.registerType("TextBlock", () => { return new TextBlockSample() });
//     // ACDesigner.CardDesignerSurface.cardElementPeerRegistry.registerPeer(TextBlockSample, ACDesigner.TextBlockPeer, "Elements", "acd-icon-textBlock");
//     //ACDesigner.CardDesignerSurface.cardElementPeerRegistry.registerPeer(Adaptive.TextBlock, TextBlockSamplePeer, "Elements", "acd-icon-textBlock");


//     designer.attachTo(document.getElementById("designerRootHost"));
//     designer.monacoModuleLoaded(monaco);

//     let sampleData = {
//         "@odata.context": "https://org355d41b6.crm.dynamics.com/api/data/v9.0/$metadata#incidents/$entity",
//         "@odata.etag": "W/\"2095895\"",
//         "statecode": 0,
//         "resolvebyslastatus": 1,
//         "statuscode": 1,
//         "createdon": "2020-04-03T08:37:43Z",
//         "ticketnumber": "CAS-01000-X6J1B0"
//     }

//     // designer.dataStructure = ACDesigner.FieldDefinition.create(sampleData);
//     designer.sampleData = sampleData;
//     console.log("--------------------------------------------------------------");
//     //  console.log(designer.dataStructure.displayName);
//     console.log("--------------------------------------------);")
//     //designer.onCardPayloadChanged
//     // designer.sampleData = {
//     //     name: "salini"
//     // }

//     //  var textblock = new Adaptive.TextBlock();
//     // textblock.text = "salini";
// };
