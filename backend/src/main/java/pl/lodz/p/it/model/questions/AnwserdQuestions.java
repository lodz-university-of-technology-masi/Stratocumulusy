package pl.lodz.p.it.model.questions;

import com.amazonaws.services.dynamodbv2.datamodeling.*;

import java.io.Serializable;
import java.util.ArrayList;

@DynamoDBDocument
public class AnwserdQuestions implements Serializable {

    private String QuestionID;
    private String question;
    private String questionType;
    private String correctAnswer;

    public String getCandidatesAnwser() {
        return candidatesAnwser;
    }

    public void setCandidatesAnwser(String candidatesAnwser) {
        this.candidatesAnwser = candidatesAnwser;
    }

    private String candidatesAnwser;
    private ArrayList<String> choices;

    public AnwserdQuestions(String questionID, String question, String questionType, String correctAnswer, ArrayList<String> choices, String candidatesAnwser) {
        QuestionID = questionID;
        this.question = question;
        this.questionType = questionType;
        this.correctAnswer = correctAnswer;
        this.candidatesAnwser = candidatesAnwser;
        this.choices = choices;
    }

    public AnwserdQuestions(String questionID, String question, String questionType, String correctAnswer, String candidatesAnwser) {
        QuestionID = questionID;
        this.question = question;
        this.questionType = questionType;
        this.correctAnswer = correctAnswer;
        this.candidatesAnwser = candidatesAnwser;
    }

    public AnwserdQuestions() {
    }

    public String getQuestionID() {
        return QuestionID;
    }

    public void setQuestionID(String questionID) {
        QuestionID = questionID;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public ArrayList<String> getChoices() {
        return choices;
    }

    public void setChoices(ArrayList<String> choices) {
        this.choices = choices;
    }


}
