import xml2js from "xml2js";

// getShowtimes() - Get showtimes via Finnkino API with the given area and date
// @area: An area ID as string
// @date: A Date instance
//
// Returns: An array of objects containing the following data:
//      eventID: string
//      title: string
//      rating: string
//      genres: string[]
//      auditorium: string
//      presentation: string
//      language: string
//      eventURL: string
//      portraitURL: string
//
// Throws:
//      TypeError - Area or date are not their respective types
//      Error - Failed to fetch Finnkino API
async function getShowtimes(area, date) {
    if (typeof area !== "string" || !(date instanceof Date))
        throw new TypeError();

    const dateFormatted = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

    const response = await fetch(`https://www.finnkino.fi/xml/Schedule/?area=${area}&dt=${dateFormatted}`);
    if (!response.ok)
        throw new Error(response.status);
    
    const text = await response.text();
    const parsed = await xml2js.parseStringPromise(text);
    const shows = parsed.Schedule.Shows[0].Show;

    let ret = new Array(shows.length);
    shows.forEach((e, i) => {
        ret[i] = {
            eventID: e.EventID[0],
            title: e.Title[0],
            rating: e.Rating[0],
            genres: e.Genres[0].split(", "),
            auditorium: e.TheatreAuditorium[0],
            presentation: e.PresentationMethod[0],
            language: e.SpokenLanguage[0].Name[0],
            eventURL: e.EventURL[0],
            portraitURL: e.Images[0].EventMediumImagePortrait[0]
        };
    });
    return ret;
}

export { getShowtimes }
