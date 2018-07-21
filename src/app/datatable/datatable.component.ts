import { Component, OnInit, Input } from "@angular/core";
import { TableColumnSetting } from "../tablecolumnsettings";
import { MessageService } from "../message.service";

@Component({
  selector: "app-datatable",
  templateUrl: "./datatable.component.html",
  styleUrls: ["./datatable.component.css"]
})
export class DatatableComponent implements OnInit {
  @Input() datas: any[];
  @Input() tablecolumnssettings: TableColumnSetting[];
  @Input() selectable: boolean = false;
  public selectdatasindexs: number[] = [];
  private originalData: any[];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.originalData = JSON.parse(JSON.stringify(this.datas));
  }

  /**
   * This function is to sort the data when column header is clicked in ascending or descending order or remove sorting.
   * @param oEvent Click event object
   */
  onColumnHeaderClick(oEvent): void {
    let propertyKey = oEvent.target.id.split("_")[0];
    let selectColumnSetting = null;

    for (let i = 0; i < this.tablecolumnssettings.length; i++) {
      if (this.tablecolumnssettings[i].columnkey === propertyKey) {
        selectColumnSetting = this.tablecolumnssettings[i];
      }
    }

    if (selectColumnSetting != null) {
      if (selectColumnSetting.sortorder === "none") {
        this.sortData("asc", propertyKey);
        this.setColumnSettingsSortOrder("asc", propertyKey);
      } else if (selectColumnSetting.sortorder === "asc") {
        this.sortData("dsc", propertyKey);
        this.setColumnSettingsSortOrder("dsc", propertyKey)
      } else {
        this.sortData("none", propertyKey);
        this.setColumnSettingsSortOrder("none", propertyKey)
      }
    } else {
      this.messageService.add(
        "Table sorting it failed as the columns selected is not the in the settings of the table"
      );
    }
  }

  setColumnSettingsSortOrder(sortOrder: string, propertyKey: string) {
    this.tablecolumnssettings.map(setting => {
      if (setting.columnkey === propertyKey) {
        setting.sortorder = sortOrder;
      } else {
        setting.sortorder = "none";
      }
      return setting;
    });
  }

  /**
   * This function is to sort the data based on given property.
   * @param sortOrder This is the sort order srting.
   * @param propertyKey property to be used to sort data.
   */
  sortData(sortOrder: string, propertyKey: string): void {
    function compare(a, b) {
      if (a[propertyKey] < b[propertyKey]) return -1;
      if (a[propertyKey] > b[propertyKey]) return 1;
      return 0;
    }

    if (sortOrder === "asc") {
      this.datas.sort(compare);
    } else if (sortOrder === "dsc") {
      this.datas.sort(compare).reverse();
    } else {
      this.datas = JSON.parse(JSON.stringify(this.originalData));
    }
  }

  /**
   * This is function is to add and remove the selected index in the when the table is selectable and any row is selected.
   * @param: Change event object
   */
  onSelectionChange(oEvent): void {
    if (oEvent.target.checked) {
      this.selectdatasindexs.push(+oEvent.target.id);
    } else if (this.selectdatasindexs.indexOf(+oEvent.target.id) > -1) {
      this.selectdatasindexs.splice(
        this.selectdatasindexs.indexOf[+oEvent.target.id],
        1
      );
    }
  }
}
