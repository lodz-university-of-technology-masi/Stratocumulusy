package pl.lodz.p.it.model.tests;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

import java.util.ArrayList;

@DynamoDBTable(tableName = "CandidatesTests")
public class CandidateTests {

    private String candidateEmail;
    private ArrayList<Test> tests;

    public CandidateTests(String candidateEmail, ArrayList<Test> tests) {
        this.candidateEmail = candidateEmail;
        this.tests = tests;
    }

    public CandidateTests() {
    }

    @DynamoDBHashKey(attributeName = "CandidateEmail")
    public String getCandidateEmail() {
        return candidateEmail;
    }

    public void setCandidateEmail(String candidateEmail) {
        this.candidateEmail = candidateEmail;
    }

    @DynamoDBAttribute(attributeName = "Tests")
    public ArrayList<Test> getTests() {
        return tests;
    }

    public void setTests(ArrayList<Test> tests) {
        this.tests = tests;
    }
}
