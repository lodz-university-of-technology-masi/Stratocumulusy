package pl.lodz.p.it.handlers;

//import com.amazonaws.Response;
import com.amazonaws.auth.ClasspathPropertiesFileCredentialsProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.*;
import com.amazonaws.services.lambda.runtime.Context;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import pl.lodz.p.it.Response;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

//public class CognitoHandler implements RequestHandler<CandidateRequest, GatewayResponse>{
public class CognitoHandler {
    private AWSCognitoIdentityProvider cognito = AWSCognitoIdentityProviderClientBuilder.defaultClient();
    private ObjectMapper objmapper = new ObjectMapper();

    public Response DeleteUser(Map<String, Object> input, Context context) {
        //String username = rq.getUser();
        String username = input.get("user").toString();
        AdminDeleteUserRequest adminDeleteUserRequest = new AdminDeleteUserRequest()
                .withUserPoolId("us-east-1_NBg2oASBN")
                .withUsername(username);
        AdminDeleteUserResult adminDeleteUserResult = cognito.adminDeleteUser(adminDeleteUserRequest);
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");
        return new Response("User" + username + " removed", headers, 200);
        //return "User " + username + " deleted";
    }

    public Response GetAllCandidates(Map<String, Object> input, Context context) {
        //ListUsersResult users = cognito.listUsers(new ListUsersRequest().withUserPoolId("us-east-1_NBg2oASBN"));
        ListUsersInGroupResult users = cognito.listUsersInGroup(new ListUsersInGroupRequest().withGroupName("Candidate").withUserPoolId("us-east-1_NBg2oASBN"));
        /*Map<String, Map<String, String>> map = new HashMap<>();
        List<UserType> candidates = users.getUsers();
        int i = 0;
        for (UserType user : candidates
        ) {
            Map<String, String> attributes = UserTypeConvert(user);
            if (attributes.get("custom:isRecruiter").equals("0")) {
                map.put(Integer.toString(i), attributes);
                i++;
            }
        }*/
        JSONObject json = new JSONObject(users);
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");
        return new Response(json.toString(), headers, 200);
    }

    private Map<String, String> UserTypeConvert(UserType userType) {
        Map<String, String> map = new HashMap<>();
        for (AttributeType attribute : userType.getAttributes()) {
            map.put(attribute.getName(), attribute.getValue());
        }
        return map;
    }

    public void AssignToGroup(Map<String, Object> input, Context context){
        AdminAddUserToGroupRequest addUserToGroupRequest = new AdminAddUserToGroupRequest()
                .withGroupName("Candidate")
                .withUserPoolId("us-east-1_NBg2oASBN")
                .withUsername(input.get("user").toString());
        cognito.adminAddUserToGroup(addUserToGroupRequest);
    }

    public Response GetAllUsers(Map<String, Object> input, Context context){
        ListUsersResult users = cognito.listUsers(new ListUsersRequest().withUserPoolId("us-east-1_NBg2oASBN"));
        JSONObject json = new JSONObject(users);
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");
        return new Response(json.toString(), headers, 200);
    }

}
