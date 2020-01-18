package pl.lodz.p.it.handlers;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.*;
import com.amazonaws.services.lambda.runtime.Context;

import java.util.Map;

public class CognitoHandler {
    private AWSCognitoIdentityProvider cognito = AWSCognitoIdentityProviderClientBuilder.defaultClient();

    public void DeleteUser(Map<String, Object> input, Context context) {
        String username = input.get("user").toString();
        AdminDeleteUserRequest adminDeleteUserRequest = new AdminDeleteUserRequest()
                .withUserPoolId("us-east-1_NBg2oASBN")
                .withUsername(username);
        cognito.adminDeleteUser(adminDeleteUserRequest);
        /*Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");
        return new Response("User" + username + " removed", headers, 200);*/
    }

    public ListUsersInGroupResult GetAllCandidates(Map<String, Object> input, Context context) {
        ListUsersInGroupResult users = cognito.listUsersInGroup(new ListUsersInGroupRequest().withGroupName("Candidate").withUserPoolId("us-east-1_NBg2oASBN"));
        return users;
        /*
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");
        return new Response(json.toString(), headers, 200);*/
    }

    public void AssignToGroup(Map<String, Object> input, Context context){
        AdminAddUserToGroupRequest addUserToGroupRequest = new AdminAddUserToGroupRequest()
                .withGroupName("Candidate")
                .withUserPoolId("us-east-1_NBg2oASBN")
                .withUsername(input.get("user").toString());
        cognito.adminAddUserToGroup(addUserToGroupRequest);
    }

    public ListUsersResult GetAllUsers(Map<String, Object> input, Context context){
        ListUsersResult users = cognito.listUsers(new ListUsersRequest().withUserPoolId("us-east-1_NBg2oASBN"));
        return users;
        /*JSONObject json = new JSONObject(users);
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");
        return new Response(json.toString(), headers, 200);*/
    }

    public String addCandidate(Map<String, Object> input, Context context) {

        AdminCreateUserRequest createUserRequest = new AdminCreateUserRequest()
                .withUserPoolId("us-east-1_NBg2oASBN")
                .withUsername(input.get("user").toString());
        cognito.adminCreateUser(createUserRequest);
        AdminSetUserPasswordRequest passwordRequest = new AdminSetUserPasswordRequest()
                .withUserPoolId("us-east-1_NBg2oASBN")
                .withUsername(input.get("user").toString())
                .withPassword(input.get("password").toString())
                .withPermanent(true);
        cognito.adminSetUserPassword(passwordRequest);
        AdminAddUserToGroupRequest addUserToGroupRequest = new AdminAddUserToGroupRequest()
                .withGroupName("Candidate")
                .withUserPoolId("us-east-1_NBg2oASBN")
                .withUsername(input.get("user").toString());
        cognito.adminAddUserToGroup(addUserToGroupRequest);
        return "Dodano kandydata!";
    }

}
