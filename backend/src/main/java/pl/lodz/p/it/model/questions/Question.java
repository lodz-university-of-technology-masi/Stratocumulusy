package pl.lodz.p.it.model.questions;

import com.amazonaws.services.dynamodbv2.datamodeling.*;

import java.io.Serializable;
import java.util.ArrayList;

@DynamoDBDocument
public class Question implements Serializable {

    /**
     * Tu mam mindfuck jak mają wyglądac pola tej klasy?
     * Dla kazdego typu powinny byc inne
     * Zrobic 3 klasy dla kazdego typu pytania dziedziczace po question?
     * Tylko jak to zapisac do bazy???
     */
    private String QuestionID;
    private String question;
    private String questionType;
    private String correctAnswer;
    private ArrayList<String> choices;

    public Question(String questionID, String question, String questionType, String correctAnswer, ArrayList<String> choices) {
        QuestionID = questionID;
        this.question = question;
        this.questionType = questionType;
        this.correctAnswer = correctAnswer;
        this.choices = choices;
    }

    public Question(String questionID, String question, String questionType, String correctAnswer) {
        QuestionID = questionID;
        this.question = question;
        this.questionType = questionType;
        this.correctAnswer = correctAnswer;
    }

    public Question() {
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
