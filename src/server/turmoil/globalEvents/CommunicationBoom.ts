import {IGlobalEvent} from './IGlobalEvent';
import {GlobalEvent} from './GlobalEvent';
import {GlobalEventName} from '../../../common/turmoil/globalEvents/GlobalEventName';
import {PartyName} from '../../../common/turmoil/PartyName';
import {IGame} from '../../IGame';
import {Turmoil} from '../Turmoil';
import {Resource} from '../../../common/Resource';
import {CardResource} from '../../../common/CardResource';
import {AddResourcesToCards} from '../../deferredActions/AddResourcesToCards';
import {CardRenderer} from '../../cards/render/CardRenderer';

const RENDER_DATA = CardRenderer.builder((b) => {
  b.megacredits(-10).nbsp.data({amount: 2}).asterix().nbsp;
  b.data().slash().influence();
});

export class CommunicationBoom extends GlobalEvent implements IGlobalEvent {
  constructor() {
    super({
      name: GlobalEventName.COMMUNICATION_BOOM,
      description: 'Pay 10M€. Add 2 data to EVERY data card. Add 1 data to any data card for each influence you have.',
      revealedDelegate: PartyName.UNITY,
      currentDelegate: PartyName.SCIENTISTS,
      renderData: RENDER_DATA,
    });
  }

  public resolve(game: IGame, turmoil: Turmoil) {
    game.getPlayersInGenerationOrder().forEach((player) => {
      player.deductResource(Resource.MEGACREDITS, 10, {log: true, from: this.name});
      player.getResourceCards(CardResource.DATA).forEach((card) => {
        player.addResourceTo(card, {qty: 2, log: true});
      });
      const count = turmoil.getPlayerInfluence(player);
      game.defer(new AddResourcesToCards(player, CardResource.DATA, count));
    });
  }
}
