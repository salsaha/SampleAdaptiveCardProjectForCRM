// import * as Adaptive from "adaptivecards";
// import * as ACDesigner from "adaptivecards-designer";
// import { StringPropertyEditor, Versions, BooleanPropertyEditor, NumberPropertyEditor, EnumPropertyEditor, CompoundPropertyEditor, PropertySheet, PropertySheetCategory, CustomPropertySheetEntry, PropertySheetContext, SingleInputPropertyEditor, TargetVersion } from "adaptivecards-designer";
// export class TextBlockSample extends Adaptive.TextBlock {
//     // constructor() {
//     //     super();
//     //     //this.setText("I am Salini");
//     // }
// }


// export class EntitySelectionEditor extends SingleInputPropertyEditor {

//     protected createInput(context: PropertySheetContext): Adaptive.Input {
//         let input = new Adaptive.ChoiceSetInput();
//         input.isCompact = true;
//         input.placeholder = "(not set)";
//         input.choices.push(new Adaptive.Choice("(not set)", "none"));
//         input.choices.push(new Adaptive.Choice("Case", "Case"));
//         input.choices.push(new Adaptive.Choice("KBArticle", "KBArticle"));

//         return input;
//     }

//     constructor(
//         readonly targetVersion: TargetVersion,
//         readonly propertyName: string,
//         readonly label: string,
//         readonly causesPropertySheetRefresh: boolean = true) {
//         super(targetVersion, propertyName, label, causesPropertySheetRefresh);
//     }
// }

// export class EntityAttributeSelectionEditor extends SingleInputPropertyEditor {

//     protected createInput(context: PropertySheetContext): Adaptive.Input {
//         let input = new Adaptive.ChoiceSetInput();
//         input.isCompact = true;
//         input.placeholder = "(not set)";
//         input.choices.push(new Adaptive.Choice("(not set)", "none"));
//         input.choices.push(new Adaptive.Choice("Choice1", "Choice2"));
//         input.choices.push(new Adaptive.Choice("Choice2", "Choice2"));
//         input.choices.push(new Adaptive.Choice("Choice3", "Choice3"));

//         return input;
//     }

//     constructor(
//         readonly targetVersion: TargetVersion,
//         readonly propertyName: string,
//         readonly label: string,
//         readonly causesPropertySheetRefresh: boolean = false) {
//         super(targetVersion, propertyName, label, causesPropertySheetRefresh);
//     }

//     render(context: PropertySheetContext): Adaptive.CardElement {
//         let leftColumn = new Adaptive.Column();
//         leftColumn.width = new Adaptive.SizeAndUnit(100, Adaptive.SizeUnit.Pixel);
//         leftColumn.verticalContentAlignment = Adaptive.VerticalAlignment.Center;

//         let rightColumn = new Adaptive.Column();
//         rightColumn.width = "stretch";
//         rightColumn.verticalContentAlignment = Adaptive.VerticalAlignment.Center;

//         let columnSet = new Adaptive.ColumnSet();

//         columnSet.spacing = Adaptive.Spacing.Small;

//         columnSet.addColumn(leftColumn);
//         columnSet.addColumn(rightColumn);

//         let label = new Adaptive.TextBlock();
//         label.horizontalAlignment = Adaptive.HorizontalAlignment.Right;
//         label.wrap = true;
//         label.text = this.label;

//         let input = this.createInput(context);
//         input.defaultValue = this.getPropertyValue(context);
//         // input.onValueChanged = () => {
//         //     this.setPropertyValue(context, input.value);
//         //     (<Adaptive.TextBlock>context.peer.getCardObject()).text = input.value;
//         //     context.peer.changed(this.causesPropertySheetRefresh);
//         // }

//         leftColumn.addItem(label);
//         rightColumn.addItem(input);

//         return columnSet;
//     }

// }

// export class TextBlockSamplePeer extends ACDesigner.TextBlockPeer {
//     static readonly entityNameSelectionProperty = new EntitySelectionEditor(Versions.v1_0, "entityNameSelection", "Entity Name", true);
//     static readonly entityAttributeSelectionProperty = new EntityAttributeSelectionEditor(Versions.v1_0, "entityAttributeSelection", "Entity Attribute", false);

//     populatePropertySheet(propertySheet: PropertySheet, defaultCategory: string = PropertySheetCategory.DefaultCategory) {


//         propertySheet.add(
//             defaultCategory,
//             TextBlockSamplePeer.entityNameSelectionProperty);

//         // propertySheet.add(
//         //     defaultCategory,
//         //     TextBlockSamplePeer.entityAttributeSelectionProperty);
//         // super.populatePropertySheet(propertySheet, defaultCategory);
//     }

//     // initializeCardElement() {
//     //     //super.initializeCardElement();
//     //     this.cardElement.text = "My Sample TextEditor";
//     // }
// }

