package pl.lodz.p.it.translator;

public class YandexError extends Exception {
    YandexError(String msg, Throwable t){
        super(msg, t);
    }
    YandexError(String msg){
        super(msg);
    }
}
