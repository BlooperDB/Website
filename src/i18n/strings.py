#!/usr/bin/env python3

import json
import os.path
import re
import sys

from collections import OrderedDict

LANG_PATTERN = re.compile('^[a-z]{2,3}(?:-[A-Z]{2})?$')

DIR = os.path.dirname(sys.argv[0])
LANG_DIR = os.path.join(DIR, 'languages')
LANG_JSON = os.path.join(LANG_DIR, 'en-US.json')

def main():
    print(get_keys())
    new_obj = OrderedDict()
    new_lang = input('Which language are we localising today? ')
    if not LANG_PATTERN.fullmatch(new_lang):
        print('Invalid language, must match', LANG_PATTERN.pattern)
        sys.exit(1)

    for key, val in get_keys():
        x = 'a'
        while x != 'y':
            x = 'a'
            translation = input('How would you translate this?\n   {}\n   '.format(val))
            while x not in 'yn':
                x = input('Are you happy with that translation? (y/n) ')
        set_key(new_obj, key, translation)

    translation_file = os.path.join(LANG_DIR, '{}.json'.format(new_lang))
    content = json.dumps(new_obj, indent = 4, separators = (',', ': '))

    with open(translation_file, 'w+') as f:
        f.write(content)

def get_keys():
    with open(LANG_JSON) as f:
        languages_json = json.load(f, object_pairs_hook = OrderedDict)
    def find_keys(obj):
        keys = []
        if not isinstance(obj, dict):
            return keys
        for k, v in obj.items():
            if isinstance(v, dict):
                for key, val in find_keys(v):
                    keys.append(('{}.{}'.format(k, key), val))
            else:
                keys.append((k, v))
        return keys
    return find_keys(languages_json)

def set_key(obj, path, value):
    path = path.split('.')
    for part in path[:-1]:
        if part not in obj:
            obj[part] = OrderedDict()
        obj = obj[part]
    obj[path[-1]] = value

if __name__ == '__main__':
    main()