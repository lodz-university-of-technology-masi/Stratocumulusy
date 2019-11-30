package pl.lodz.p.it.translator;

public enum Language {

    POLISH("pl"),
    ENGLISH("en");

    private String languageCode;
    Language(String languageCode) {
        this.languageCode = languageCode;
    }

    public String getLanguageCode() {
        return languageCode;
    }
}
