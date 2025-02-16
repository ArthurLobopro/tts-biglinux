#!/bin/python

from sys import argv
import json

import gettext
lang_translations = gettext.translation(
    'tts-biglinux',
    localedir='/usr/share/locale',
    fallback=True
)
lang_translations.install()



ARGS = argv[1]

strings_to_return: list[str] = json.loads(ARGS)

TRANSLATIONS = {}

for string in strings_to_return:
    TRANSLATIONS[string] = lang_translations.gettext(string)

print(json.dumps(TRANSLATIONS))
# print("Teste")