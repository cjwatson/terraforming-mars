import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {Player} from '../../Player';
import {Resources} from '../../../common/Resources';
import {CardName} from '../../../common/cards/CardName';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../../../common/cards/render/Size';
import {all} from '../Options';

export class Zeppelins extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.ZEPPELINS,
      cost: 13,
      victoryPoints: 1,

      requirements: CardRequirements.builder((b) => b.oxygen(5)),
      metadata: {
        cardNumber: '129',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.megacredits(1).slash();
            pb.city({size: Size.SMALL, all}).asterix();
          });
        }),
        description: 'Requires 5% oxygen. Increase your M€ production 1 step for each City tile ON MARS.',
      },
    });
  }
  public override bespokePlay(player: Player) {
    player.production.add(Resources.MEGACREDITS, player.game.getCitiesOnMarsCount(), {log: true});
    return undefined;
  }
}
