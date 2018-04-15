package actors;

import akka.actor.ActorRef;
import akka.actor.Props;
import akka.actor.UntypedActor;
import com.fasterxml.jackson.databind.ObjectMapper;
import data.FeedResponse;
import data.Message;
import data.NewsAgentResponse;
import services.FeedService;
import services.NewsAgentService;

import java.util.UUID;

import static data.Message.Sender.*;

public class MessageActor extends UntypedActor {
    //self reference and props
    //object of feed service
    //object of newsAgentService
    //define another actor
    private final ActorRef out;
    FeedService feedService = new FeedService();
    NewsAgentService newsAgentService = new NewsAgentService();
    NewsAgentResponse newsAgentResponse=new NewsAgentResponse();
    FeedResponse feedresponse = new FeedResponse();
    public MessageActor(ActorRef out) {
        this.out = out;
    }

    public static Props props(ActorRef out) {
        return Props.create(MessageActor.class, out);
    }

    @Override
    public void onReceive(Object message) throws Throwable {
        // send back the onrecieve
        ObjectMapper objectMapper = new ObjectMapper();
        if (message instanceof String) {
            Message messageObject = new Message();
            messageObject.text =message.toString();
            messageObject.sender=USER;
            out.tell(objectMapper.writeValueAsString(messageObject), self());
           newsAgentResponse = newsAgentService.getNewsAgentResponse("Find " + message, UUID.randomUUID());
           feedresponse = feedService.getFeedByQuery(newsAgentResponse.query);
            messageObject.text = (feedresponse.title == null) ? "No results found" : "Showing results for: " + newsAgentResponse.query;
            messageObject.feedResponse=feedresponse;
            messageObject.sender=BOT;
           out.tell(objectMapper.writeValueAsString(messageObject), self());

        }

    }
}