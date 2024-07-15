extends Area2D

@onready var back_end = %"Back End"




func _on_body_entered(body):
	if(body.name=="Player"):
		queue_free()
		back_end.add_point()
		
