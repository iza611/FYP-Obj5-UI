from json import load
from numpy import array

from fake_API import get_lblDir, get_saveDir
    
class SpeciesHandler:
    def __init__(self, species=None):
        if(species==None):
            self.species = self.get_species()
        else:
            self.species = species
            
        self.id_to_name_dictionary()
        self.name_to_id_dictionary()
        
    def get_species(self):
        labels_directory = get_lblDir()
        file = open(labels_directory)
        data = load(file)
        
        species = []
        
        for i in range(len(data["categories"])):
            name = data["categories"][i]["name"]
            iD = data["categories"][i]["id"]
            species.append((iD, name))
        
        return species
        
    def id_to_name_dictionary(self):
        dictionary = {}
        for specie in self.species:
            iD = specie[0]
            name = specie[1]
            dictionary[iD] = name
            
        self.id_to_name = dictionary
        
    def name_to_id_dictionary(self):
        dictionary = {}
        for specie in self.species:
            iD = specie[0]
            name = specie[1]
            dictionary[name] = iD
            
        self.name_to_id = dictionary
        
    def get_name(self, iD):
        try:
            name = self.id_to_name[iD]
        except:
            name = 'undefined'
        return name
    
    def get_id(self, name):
        try:
            iD = self.name_to_id[name]
        except:
            iD = 'undefined'
        return iD
    
    def save_species(self):
        save_dir = get_saveDir()
        open(save_dir + '/species.txt', 'w').write('\n'.join('%s, %s' % x for x in self.species))
        print('saved')
    
    def load_species(self):
        save_dir = get_saveDir()
        with open(save_dir + '/species.txt', 'r') as f:
            species = [tuple(map(str, i.split(','))) for i in f]
            
        species_converted = []
        for specie in species:
            species_converted.append( ( int(specie[0]), specie[1][0:len(specie[1])-1] ) )
        print('read')
        print(species_converted)
        # return species

# species = [(0, 'Bird'), (1, 'Eastern Gray Squirrel'), (2, 'Eastern Chipmunk'), (3, 'Woodchuck'), (4, 'Wild Turkey'), (5, 'White_Tailed_Deer'), (6, 'Virginia Opossum'), (7, 'Eastern Cottontail'), (9, 'Vehicle'), (10, 'Striped Skunk'), (11, 'Red Fox'), (12, 'Eastern Fox Squirrel'), (13, 'Northern Raccoon'), (14, 'Grey Fox'), (15, 'Horse'), (16, 'Dog'), (17, 'American Crow'), (18, 'Chicken'), (19, 'Domestic Cat'), (20, 'Coyote'), (21, 'Bobcat'), (22, 'American Black Bear')]
# species_handler_2 = SpeciesHandler(species)