import json

keywords = {'toplists': ['top', 'popular'], 
            'at_home': ['chores', 'home', 'house', 'clean'], 
            'pop': ['pop', 'popular','teen'], 
            'mood': ['mood', 'vibe'], 
            'decades': ['decade', '50s', '60s', '70s', '80s', '90s', '2000s'],
            'hiphop': ['hiphop'], 
            'in_the_car': ['drive', 'driving','car','uber','lift','ride','trip'],
            'gaming': ['game', 'games', 'gaming','console','xbox'],
            'diwali': ['diwali'],
            'travel': ['travel', 'vacation', 'hotel', 'road trip', 'journey', 'road', 'flight'],
            'holidays': ['holidays', 'christmas', 'santa', 'gift', 'hannukah','december'],
            'arab': ['arab'],
            'inspirational': ['goal', 'goals'],
            'dinner': ['dinner', 'dinner party', 'supper', 'dining', 'cook'],
            'romance': ['romance', 'romantic', 'love', 'date night', 'boyfriend', 'girlfriend', 'husband', 'wife', 'wedding', 'honeymoon'],
            'funk': ['funk', 'rhythm', 'rhythmic'],
            'soul': ['soul'],
            'decades': ['decades', 'throwback'],
            'latin': ['latin'],
            'alternative': ['alternative'],
            'comedy': ['comedy', 'lol', 'haha'],
            'rnb': ['rnb'],
            'pride': ['pride', 'lgbt', 'lesbian', 'gay', 'bisexual', 'transgender'],
            'sports': ['sport', 'sports', 'basketball', 'baseball', 'football', 'volleyball', 'tennis', 'golf', 'soccer', 'coach'],
            'kpop': ['kpop', 'korea', 'korean'],
            'blues': ['blues'],
            'roots': ['roots'],
            'anime': ['anime', 'japan', 'japanese'],
            'focus': ['study', 'studying', 'focus', 'test', 'quiz', 'homework', 'assignment', 'project'],
            'jazz': ['jazz', 'improvise'],
            'indie_alt': ['indie', 'alternative'],
            'metal': ['metal', 'heavy metal'],
            'regional_mexican': ['mexico', 'mexican'],
            'country': ['country music', 'farm', 'barn', 'banjo', 'old west'],
            'wellness': ['wellness', 'heal', 'recover', 'yoga', 'spirit'],
            'workout': ['workout', 'work out', 'exercise', 'weights', 'run', 'running', 'stretch', 'walk'],
            'desi': ['India', 'Indian', 'Pakistan', 'Pakistani', 'Bangladesh', 'Bangladeshi'],
            'rock': ['rock', 'rock music', 'rock concert'],
            'blackhistorymonth': ['black history', 'blm', 'black lives matter'],
            'party': ['party', 'dance', 'fiesta', 'alcohol'],
            'sessions': ['sessions'],
            'family': ['family', 'family time', 'family reunion', 'thanksgiving'],
            'instrumental': ['instrumental'],
            'radar': ['explore', 'fun', 'new', 'free time'],
            'student': ['student', 'college', 'university', 'essay'],
            'edm_dance': ['edm', 'club', 'nightclub'],
            'chill': ['chill', 'relax'],
            'thirdparty': ['thirdparty'],
            'caribbean': ['caribbean'],
            'shows_with_music': ['tv', 'shows', 'episode'],
            'punk': ['punk'],
            'classical': ['classical', 'classical music', 'chopin', 'mozart', 'beethoven'],
            'sleep': ['sleep', 'nap', 'rest', 'siesta', 'snooze', 'night', 'bed', 'dream'],
            'afro': ['africa', 'african'],
            'popculture': ['pop culture', 'modern'],
        } 
with open('categoryMap.json', 'w') as json_file: 
    json.dump(keywords, json_file)