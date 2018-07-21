import { Component, OnInit, Input } from "@angular/core";
import { TableColumnSetting } from "../tablecolumnsettings";

@Component({
  selector: "app-datatable",
  templateUrl: "./datatable.component.html",
  styleUrls: ["./datatable.component.css"]
})
export class DatatableComponent implements OnInit {
  @Input() datas: any[];
  @Input() tablecolumnssettings: TableColumnSetting[];
  @Input() selectable: boolean = false;;
  public selectdatasindexs: number[] = [];

  constructor() {}

  ngOnInit() {}

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
