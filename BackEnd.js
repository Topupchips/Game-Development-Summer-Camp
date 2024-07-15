extends Node
@onready var label = $"../UI/Panel/Label"

var points=0
var lives=4
func decrease_health():
	lives=lives-1
	print(lives)
	if(lives==0):
		get_tree().reload_current_scene()
		
func add_point():
	points +=1
	print(points)
	label.text="Diamonds: "+str(points)
