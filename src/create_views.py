import json
from itertools import chain

"""
CREATE OR REPLACE VIEW v_accomodationsopen AS
SELECT id, data->'Beds' AS Beds, data->'Units' AS Units
FROM accommodationsopen;
"""


def create_view(data, table_name):
    sql_template = """
CREATE OR REPLACE VIEW v_%s AS
SELECT %s
FROM %s;
"""
    projections = ", \n".join(columns(data, '', ''))

    return sql_template % (table_name, projections, table_name)


def columns(data, access_prefix, column_prefix):
    simple_columns = ["data->" + access_prefix + "'" + k + "' AS " + column_prefix + k
                                   for k in data.keys()
                                   if
                                   data.get(k) is not None
                                   and not isinstance(data.get(k), list)
                                   and not isinstance(data.get(k), dict)
                                   ]

    dict_columns_list = [columns(data.get(k), access_prefix + "'"+  k + "'->", column_prefix + k + '_')
                    for k in data.keys()
                    if data.get(k) is not None and isinstance(data.get(k), dict)
                    ]

    dict_columns = list(chain.from_iterable(dict_columns_list))

    return simple_columns + dict_columns


with open('data.json') as json_file:
    data = json.load(json_file)

    print(data)
    # for key in data.keys():
    # print(key)
    print(create_view(data, 'metaregionsopen'))
