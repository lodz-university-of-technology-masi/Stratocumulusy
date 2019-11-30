package pl.lodz.p.it.translator;

import org.json.JSONObject;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

/*
Supported languages codes:
{"dirs":["az-ru","be-bg","be-cs","be-de","be-en","be-es","be-fr","be-it","be-pl","be-ro","be-ru","be-sr","be-tr","bg-be",
"bg-ru","bg-uk","ca-en","ca-ru","cs-be","cs-en","cs-ru","cs-uk","da-en","da-ru","de-be","de-en","de-es","de-fr","de-it",
"de-ru","de-tr","de-uk","el-en","el-ru","en-be","en-ca","en-cs","en-da","en-de","en-el","en-es","en-et","en-fi","en-fr",
"en-hu","en-it","en-lt","en-lv","en-mk","en-nl","en-no","en-pt","en-ru","en-sk","en-sl","en-sq","en-sv","en-tr","en-uk",
"es-be","es-de","es-en","es-ru","es-uk","et-en","et-ru","fi-en","fi-ru","fr-be","fr-de","fr-en","fr-ru","fr-uk","hr-ru",
"hu-en","hu-ru","hy-ru","it-be","it-de","it-en","it-ru","it-uk","lt-en","lt-ru","lv-en","lv-ru","mk-en","mk-ru","nl-en",
"nl-ru","no-en","no-ru","pl-be","pl-ru","pl-uk","pt-en","pt-ru","ro-be","ro-ru","ro-uk","ru-az","ru-be","ru-bg","ru-ca",
"ru-cs","ru-da","ru-de","ru-el","ru-en","ru-es","ru-et","ru-fi","ru-fr","ru-hr","ru-hu","ru-hy","ru-it","ru-lt","ru-lv",
"ru-mk","ru-nl","ru-no","ru-pl","ru-pt","ru-ro","ru-sk","ru-sl","ru-sq","ru-sr","ru-sv","ru-tr","ru-uk","sk-en","sk-ru",
"sl-en","sl-ru","sq-en","sq-ru","sr-be","sr-ru","sr-uk","sv-en","sv-ru","tr-be","tr-de","tr-en","tr-ru","tr-uk","uk-bg",
"uk-cs","uk-de","uk-en","uk-es","uk-fr","uk-it","uk-pl","uk-ro","uk-ru","uk-sr","uk-tr"]}
 */


public class YandexTranslator {
    private final static String YANDEX_KEY = "trnsl.1.1.20191117T175824Z.dbb85b4384b7c245" +
            ".920cb2f0bb257d31ef012abebebde29ad78ba38d";

    private YandexTranslator(){}

    public static String translateText(String text, Language fromLang, Language toLang) {
        String translatedText = "";
        try {
            URL url = createURL(text, fromLang.getLanguageCode(), toLang.getLanguageCode());
            translatedText = getRequestToYandex(url);
        } catch (IOException | YandexError e) {
            translatedText = text;
            e.printStackTrace();
        }
        return translatedText;
    }

    private static String readAllFromStream(InputStream inputStream) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line);
        }
        br.close();
        return sb.toString();
    }

    private static String getRequestToYandex(URL url) throws IOException, YandexError {
        URLConnection connection = url.openConnection();
        InputStream is = connection.getInputStream();
        JSONObject json = new JSONObject(readAllFromStream(is));
        if (200 == (int) json.get("code")) {
            String translatedTest = json.get("text").toString();
            return translatedTest.substring(2, translatedTest.length() - 2);
        } else {
            throw new YandexError("Error from site, result code different than '200'");
        }

    }

    private static URL createURL(String text, String fromLang, String toLang) {
        String urlTmp = "https://translate.yandex.net/api/v1.5/tr.json/translate";
        urlTmp += "?key=" + YANDEX_KEY;
        urlTmp += "&text=" + text;
        urlTmp += "&lang=" + fromLang + "-" + toLang;
        urlTmp = urlTmp.replaceAll(" ", "%20");
        try {
            return new URL(urlTmp);
        } catch (MalformedURLException ignore) {
            return null;
        }
    }
}
