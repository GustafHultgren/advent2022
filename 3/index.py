with open('./input', encoding='utf8') as f:
  contents = f.read()

rucksacks = contents.lstrip().rstrip().split('\n')

# Part 1
def split_rucksack(rucksack):
  i = len(rucksack) // 2
  return [rucksack[:i], rucksack[i:]]

rucksacks = list(map(split_rucksack, rucksacks))

def get_duplicates(rucksack):
  half = len(rucksack) // 2

  compartment_1 = rucksack[0]
  compartment_2 = rucksack[1]

  dups = []

  for item in compartment_1:
    if item in compartment_2 and item not in dups:
      dups.append(item)

  return dups

dups = list(map(get_duplicates, rucksacks))

UPPER_CASE_BOUND = 64
LOWER_CASE_BOUND = 96
def get_priority(item):

  utf = ord(item)
  lowercase = utf > LOWER_CASE_BOUND

  if(lowercase):
    return utf - LOWER_CASE_BOUND

  return utf - UPPER_CASE_BOUND + 26

priorities = list(
  map(lambda dup:
    sum(list(
      map(get_priority, dup)
      )
    ),
  dups)
)

priority_score = sum(priorities)
# print(priority_score)

# Part 2
rucksacks = contents.lstrip().rstrip().split('\n')

def split_list(list):
  result = []
  step = 3
  for i in range(0, len(list), step):
    x = i
    result.append(list[x:x+step])
  return result

groups = split_list(rucksacks)

def get_common_item(group):
  items = {}
  for i in range(len(group)):

    rucksack = [*set(group[i])]
    for item in rucksack:
      items[item] = 1 if items.get(item) is None else items[item] + 1

  common = list(items.keys())[list(items.values()).index(3)]
  return common


common_items = list(map(get_common_item, groups))

priorities = list(map(get_priority, common_items))

priorities_tot = sum(priorities)

print(priorities_tot)
