# Impressions, decisions and orientations

The objective of this document is to provide the impressions of challenges development, justify some decisions and give orientations on the application.

## Impressions
At first I was completely lost and full of doubts, I thought I might not be able to deliver the challenge. However, after taking time to understand it better and after Hubert's answers, it became clear to me what I had to do. Personally, I found that the description of the challenge is a bit confusing and difficult to understand when reading only once.

Even with the one week deadline, two days were lost because of previously planned arrangements and most of them were compromised due to my current job. So, the main focus was to deliver the main object: the chart and, only then, try to accomplish the other points as much as possible.
Because of that, it became a bit difficult to reconcile time, but overall, I thought it was time enough to be able to deliver the almost complete challenge.

The main problem faced was the timestamp issue. It was difficult to find a library that handles datatime objects in x axis easily, in a simple way, and understands the format that the challenge requires.

With the challenge, I discovered many chart libraries while studying the best option to be used for the challenge, which it could be useful in future data science projects and i also strengthened my knowledge in the javascript language.

 ## Decisions
The HighCharts library was chosen because of its performance, popularity in the community, easiness and mainly because it's series-oriented, which made it very easy to include data in the chart, due the context of the challenge.

The page was designed according to the layout that the challenge requires. Personally, I believe that this layout is simple, clean and objective, giving emphasis to the chart and providing a friendly data entry area for those familiar with coding.
(The colors of each series it's handled by the chart library)

The way I found to handle a very large amount of possible data was to read each JSON object at a time, dedicating a variable just to store the current object and always update this variable.

 ## Orientations

Because the page's code editor returns a string, you need to provide an formatted input that can be converted successfully to JSON. For this, each property must be in double quotes, as well as string values. Numeric values are not written in quotation marks.

Example:
```
{"type": "start", "timestamp": 1519780251293, "select": ["min_response_time", "max_response_time"], "group": ["os", "browser"]}
```
Each time the button "GENERATE CHART" is clicked, the chart will be redone according to the values in the code editor. So you do not have to reload the page to insert a new dataset.

## What's missing

*Write Tests*: I couldn't do it mostly because of the time and also because of the lack of experience in writing web-based test routines.

*Argue about cost and benefits involved in design choice*: I lack the experience to discuss this subject.
