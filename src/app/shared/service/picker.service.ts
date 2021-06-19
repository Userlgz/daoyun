import { Injectable } from '@angular/core';
import { PickerController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PickerService {
  constructor(public pickercontroller: PickerController) { }
  async openPicker(numColumns = 1, numOptions = 5, multiColumnOptions, selectIdx, callback) {
    const picker = await this.pickercontroller.create({
      columns: this.getColumns(numColumns, numOptions, multiColumnOptions, selectIdx),
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '确定',
          handler: value => {
            // console.log('Got Value: ', value);
            callback(JSON.stringify(value));
          }
        }
      ]
    });
    await picker.present();
  }
  getColumns(numColumns, numOptions, columnOptions, selectIdx) {
    const columns = [];
    console.log('getColumns', selectIdx);
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col-${i}`,
        selectedIndex: selectIdx[i],
        options: this.getColumnOptions(i, numOptions, columnOptions)
      });
    }
    return columns;
  }
  getColumnOptions(columnIndex, numOptions, columnOptions) {
    const options = [];
    for (let i = 0; i < columnOptions[columnIndex].length; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i
      });
    }
    return options;
  }
}
