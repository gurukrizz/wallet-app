import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CardsService } from "../cards.service";
import { Card } from "../card";
import { Payment } from "../payment";
import { PaymentsService } from "../payments.service";
import { TableColumnSetting } from "../tablecolumnsettings";
@Component({
  selector: "app-cards",
  templateUrl: "./cards.component.html",
  styleUrls: ["./cards.component.css"]
})
export class CardsComponent implements OnInit {
  public cards: Card[];
  public selectedCard: Card;
  public showSelectedCard = false;
  public selectedCardPayments: Payment[] = [];
  public tableColumnSettings: TableColumnSetting[];

  constructor(
    private router: Router,
    private cardsService: CardsService,
    private paymentsService: PaymentsService
  ) {}

  ngOnInit() {
    if (!localStorage.getItem("userId")) {
      this.router.navigate(["/login"]);
    }
    this.cardsService.getCards().subscribe(cards => (this.cards = cards));
  }

  /**
   * 
   * @param oEvent Change event object from select control when card selection changed
   */
  onSelectedCardChange(oEvent): void {
    if (oEvent.target.value === "selectCard") {
      this.showSelectedCard = false;
      this.selectedCardPayments = [];
    } else {
      this.cardsService.getCard(oEvent.target.value).subscribe(card => {
        this.selectedCard = card;
        this.showSelectedCard = true;
        this.tableColumnSettings = [
          {
            columnkey: "paymentid",
            columnsorder: 2,
            columntitle: "transaction number",
            sortorder: "none"
          },
          {
            columnkey: "merchantname",
            columnsorder: 1,
            columntitle: "merchant name",
            sortorder: "none"
          },
          {
            columnkey: "amountpaid",
            columnsorder: 0,
            columntitle: "amount",
            sortorder: "none"
          },
          {
            columnkey: "currencycode",
            columnsorder: 3,
            columntitle: "currency",
            sortorder: "none"
          },
          {
            columnkey: "deffered",
            columnsorder: 4,
            columntitle: "status",
            sortorder: "none"
          }
        ];
        this.paymentsService.getPayments().subscribe(payments => {
          this.selectedCardPayments = payments.filter(
            payment => payment.cardnumber === this.selectedCard.cardnumber
          );
        });
      });
    }
  }
}
