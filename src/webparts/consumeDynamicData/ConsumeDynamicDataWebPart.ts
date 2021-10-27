import { Version } from '@microsoft/sp-core-library';

import { DynamicProperty } from '@microsoft/sp-component-base';

import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ConsumeDynamicDataWebPart.module.scss';

import * as strings from 'ConsumeDynamicDataWebPartStrings';

export interface IConsumeDynamicDataWebPartProps {
  description: string;
}

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const itemID: Number = Number(params.get("itemID"));
const listID: string = params.get("listID");

export default class ConsumeDynamicDataWebPart extends BaseClientSideWebPart<IConsumeDynamicDataWebPartProps> {

  public render(): void {
    this.domElement.innerHTML =
      `<table>
        <tbody>
          <tr>
            <td style="padding: 10px;text-align: left;">Selected Item</td>
            <td style="padding: 10px;text-align: left;"><label for="itemID">${itemID}</label></td>
          </tr>
          <tr>
            <td style="padding: 10px;text-align: left;">List GUID</td>
            <td style="padding: 10px;text-align: left;"><label for="listID">${listID}</label></td>
          </tr>
          <tr>
            <td style="padding: 10px;text-align: left;">
              <button class="${styles.button} home-Button ms-Grid-col ms-u-sm12 block" id="home">
                <span class="${styles.label}">Home</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>`;
    this._bindEvents();
  }

  private _bindEvents() {
    document.getElementById('home').addEventListener("click", (e: Event) => this._backHome());
  }

  private _backHome(): void {
    window.location.assign("https://spdev1200.sharepoint.com/sites/POC-RFP/Lists/Master_Country/AllItems.aspx");
  }


  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
