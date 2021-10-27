import { override } from '@microsoft/decorators';
import { Guid, Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';

import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'CustomEcbCommandSetStrings';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICustomEcbCommandSetProperties {
  // This is an example; replace with your own properties
  targetUrl: string;
}

const LOG_SOURCE: string = 'CustomEcbCommandSet';

const siteUrl: string = "https://spdev1200.sharepoint.com/sites/POC-RFP";

export default class CustomEcbCommandSet extends BaseListViewCommandSet<ICustomEcbCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized CustomEcbCommandSet');
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const compareOneCommand: Command = this.tryGetCommand('ShowDetails');
    if (compareOneCommand) {
      // This command should be hidden unless exactly one row is selected.
      compareOneCommand.visible = event.selectedRows.length === 1;
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'ShowDetails':

        const itemId: Number = event.selectedRows[0].getValueByName("ID");
        const listId: Guid = this.context.pageContext.list.id;
        console.log("-- inside onexecute() id => " + itemId);
        //window.location.replace(`${this.properties.targetUrl}`);
        window.location.assign(`${siteUrl}/${this.properties.targetUrl}?itemID=${itemId}&listID=${listId}`);

        break;
      default:
        throw new Error('Unknown command');
    }
  }


}
