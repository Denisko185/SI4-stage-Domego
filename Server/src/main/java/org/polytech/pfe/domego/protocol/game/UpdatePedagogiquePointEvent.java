package org.polytech.pfe.domego.protocol.game;

import com.google.gson.JsonObject;
import org.polytech.pfe.domego.components.business.Game;
import org.polytech.pfe.domego.components.business.Messenger;
import org.polytech.pfe.domego.database.accessor.GameAccessor;
import org.polytech.pfe.domego.exceptions.MissArgumentToRequestException;
import org.polytech.pfe.domego.models.Player;
import org.polytech.pfe.domego.protocol.EventProtocol;
import org.polytech.pfe.domego.protocol.game.key.GameRequestKey;
import org.polytech.pfe.domego.protocol.game.key.GameResponseKey;
import org.springframework.web.socket.WebSocketSession;

import java.util.Map;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

public class UpdatePedagogiquePointEvent implements EventProtocol {


    private Map<String, ?> request;
    private Messenger messenger;
    private final Logger logger = Logger.getGlobal();

    public UpdatePedagogiquePointEvent(WebSocketSession session, Map request) {
        this.messenger = new Messenger(session);
        this.request = request;

    }

    @Override
    public void processEvent() {
        try {
            this.checkArgumentOfRequest();
        }catch (MissArgumentToRequestException missArgumentToRequest){
            this.messenger.sendErrorCuzMissingArgument(missArgumentToRequest.getMissKey().getKey());
            return;
        }

        Optional<Game> optionalGame = new GameAccessor().getGameById(String.valueOf(request.get(GameRequestKey.GAMEID.getKey())));
        if(optionalGame.isEmpty()){
            this.messenger.sendError("GAME NOT FOUND");
            return;
        }

        Game game = optionalGame.get();


        Optional<Player> optionalPlayer = game.getPlayers().stream().filter(player -> player.getID().equals(String.valueOf(request.get(GameRequestKey.USERID.getKey())))).findAny();

        if (optionalPlayer.isEmpty()){
            this.messenger.sendError("USER NOT FOUND");
            return;
        }

        Player player = optionalPlayer.get();

        this.updatePedagoPoints(player);
        sendResponseToUsers(player, game);

    }

    private void updatePedagoPoints(Player player) {
        player.subtractPedagoPoint();
        logger.log(Level.INFO,"Mise à jour des points pédagogiques");
    }


    private void sendResponseToUsers(Player player,Game game) {
        JsonObject response = new JsonObject();
        response.addProperty(GameResponseKey.RESPONSE.key, "UPDATE_PEDAGO_QP");
        response.addProperty(GameResponseKey.USER_ID.key,player.getID());
        response.addProperty(GameResponseKey.PEDAGOPOINTS.key, player.getPedagoQestPoints());
        response.addProperty(GameResponseKey.GAME_ID.key, game.getId());
        messenger.sendSpecificMessageToAUser(response.toString());

    }

    private void checkArgumentOfRequest() throws MissArgumentToRequestException {
        if(!request.containsKey(GameRequestKey.GAMEID.getKey()))
            throw new MissArgumentToRequestException(GameRequestKey.GAMEID);
        if(!request.containsKey(GameRequestKey.USERID.getKey()))
            throw new MissArgumentToRequestException(GameRequestKey.USERID);
        if(!request.containsKey(GameRequestKey.PEDAGOPOINTS.getKey()))
            throw new MissArgumentToRequestException(GameRequestKey.PEDAGOPOINTS);
    }

}
