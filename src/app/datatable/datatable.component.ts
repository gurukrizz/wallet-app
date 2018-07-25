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
  @Input() enableVisualEditor: boolean = false;
  @Input() tabletitle: string;
  @Input() tablecolumnssettings: TableColumnSetting[];
  @Input() selectable: boolean = false;
  public showVisualEditor: boolean = false;
  public selectdatasindexs: number[] = [];
  private originalData: any[];
  private originalSettings: TableColumnSetting[];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    /**This is done to take backup of the original data in order replace sorted or deleted data for the first time
     when component is created.*/
    this.originalData = JSON.parse(JSON.stringify(this.datas));
    this.sortColumnSettings();
  }

  /**
   * This function is to detect changes in the datas and reset the original data to the new one.
   */
  ngOnChanges() {
    this.originalData = JSON.parse(JSON.stringify(this.datas));
    this.originalSettings = JSON.parse(
      JSON.stringify(this.tablecolumnssettings)
    );
    this.sortColumnSettings();
  }

  /**
   * This functiont to perform sorting when drag started.
   * @param oEvent This is onDragStarte Event in the column header.
   */
  onColumnDragStart(oEvent): void {
    oEvent.dataTransfer.setData("dragiconid", oEvent.target.id);
  }

  /**
   * This functiont to perform sorting when drag started.
   * @param oEvent This is onDragOver Event in the column header.
   */
  onColumnDragOver(oEvent): void {
    oEvent.preventDefault();
  }

  /**
   * This functiont to perform something when drag started.
   * @param oEvent This is onDrop column Event in the column header.
   */
  onColumnDrop(oEvent): void {
    oEvent.preventDefault();
    let draggedColumnIndex = +oEvent.dataTransfer
      .getData("dragiconid")
      .split("_")[1];
    let dropColumnIndex = +oEvent.target.id.split("_")[2];
    if (draggedColumnIndex < dropColumnIndex) {
      for (let i = draggedColumnIndex + 1; i <= dropColumnIndex; i++) {
        this.tablecolumnssettings[i].columnsorder -= 2;
      }
      this.tablecolumnssettings[
        draggedColumnIndex
      ].columnsorder = dropColumnIndex;
    } else if (draggedColumnIndex > dropColumnIndex) {
      for (let i = dropColumnIndex ; i < draggedColumnIndex; i++) {
        this.tablecolumnssettings[i].columnsorder += 2;
      }
      this.tablecolumnssettings[
        draggedColumnIndex
      ].columnsorder = dropColumnIndex;
    }
    this.sortColumnSettings();
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
        this.setColumnSettingsSortOrder("dsc", propertyKey);
      } else {
        this.sortData("none", propertyKey);
        this.setColumnSettingsSortOrder("none", propertyKey);
      }
    } else {
      this.messageService.add(
        "Table sorting it failed as the columns selected is not the in the settings of the table"
      );
    }
  }

  /**
   * This function is to sort the column when rendering the table.
   */
  sortColumnSettings(): void {
    function compareSettings(
      column1: TableColumnSetting,
      column2: TableColumnSetting
    ) {
      if (column1.columnsorder < column2.columnsorder) return -1;
      if (column1.columnsorder > column2.columnsorder) return 1;
      return 0;
    }

    this.tablecolumnssettings = this.tablecolumnssettings.sort(compareSettings);
  }

  /**
   * Function to remove the columns when remove column button is clicked.
   * @param oEvent Click event object
   */
  removeColumn(oEvent): void {
    let columnIndex = oEvent.target.id.split("_")[0];
    this.tablecolumnssettings.splice(columnIndex, 1);
  }

  /**
   * Function to set the sort order proper of the column setting and reset other column settings to none.
   * @param sortOrder Sort order for the column.
   * @param propertyKey property that identifies the columns in table.
   */
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
