package pl.lodz.p.it.model;

import com.amazonaws.services.dynamodbv2.datamodeling.*;

@DynamoDBTable(tableName = "Question")
public class Question {

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

    public Question(String questionID, String question, String questionType, String correctAnswer) {
        QuestionID = questionID;
        this.question = question;
        this.questionType = questionType;
        this.correctAnswer = correctAnswer;
    }

    public Question() {
    }

    @DynamoDBHashKey(attributeName = "QuestionID")
    public String getQuestionID() {
        return QuestionID;
    }

    public void setQuestionID(String questionID) {
        QuestionID = questionID;
    }

    @DynamoDBAttribute(attributeName = "Content")
    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    @DynamoDBAttribute(attributeName = "Type")
    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    @DynamoDBAttribute(attributeName = "CorrectAnswer")
    public String getRightAnswer() {
        return correctAnswer;
    }

    public void setRightAnswer(String rightAnswer) {
        this.correctAnswer = rightAnswer;
    }
}
