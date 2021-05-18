import numpy as np
import math

import matplotlib.pyplot as plot

 


time = np.arange(0, 2*3.16, 0.1);

returnVector = []	

for x in range(0,500):
	returnVector.append(math.floor((np.sin((x/500)*2*3.14156) * 512) + 512))	

print(returnVector)	