import {DeferredAction, Priority} from '../deferredActions/DeferredAction';
import {SelectAmount} from '../inputs/SelectAmount';
import {IPlayer} from '../IPlayer';
import {Resource} from '../../common/Resource';

export class SellSteel extends DeferredAction {
  constructor(
    player: IPlayer,
    public title: string = 'Sell your steel for 3M€ each.',
  ) {
    super(player, Priority.DEFAULT);
  }

  private logSale(unitsSold: number) {
    this.player.game.log('${0} sold ${1} steel', (b) => b.player(this.player).number(unitsSold));
  }
  public execute() {
    const unitsAvailable = this.player.steel;
    if (unitsAvailable <= 0) {
      this.logSale(0);
      return undefined;
    }
    return new SelectAmount(
      'Select a number of units of steel to sell',
      'Sell steel',
      (unitsSold: number) => {
        if (unitsSold > 0) {
          const cashEarned = unitsSold * 3;
          this.player.addResource(Resource.MEGACREDITS, cashEarned);
          this.player.deductResource(Resource.STEEL, unitsSold);
        }
        this.logSale(unitsSold);
        return undefined;
      },
      0,
      unitsAvailable,
    );
  }
}
