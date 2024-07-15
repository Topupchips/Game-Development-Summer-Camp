extends CharacterBody2D

	
const SPEED = 300.0
const JUMP_VELOCITY = -400.0
@onready var animated_sprite_2d = $AnimatedSprite2D
@onready var back_end = %"Back End"
@export var Hearts : Array[Node]

# Get the gravity from the project settings to be synced with RigidBody nodes.
var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")


func _physics_process(delta):
	

	# Add the gravity.
	if not is_on_floor():
		velocity.y += gravity * delta
		animated_sprite_2d.animation="Jump"

	# Handle jump.
	if Input.is_action_just_pressed("Jump") and is_on_floor():
		velocity.y = JUMP_VELOCITY

	# Get the input direction and handle the movement/deceleration.
	# As good practice, you should replace UI actions with custom gameplay actions.
	var direction = Input.get_axis("Left", "Right")
	if direction:
		velocity.x = direction * SPEED
	else:
		velocity.x = move_toward(velocity.x, 0, SPEED)
	if is_on_floor():
		# This if statement checks whether the player is moving or not
		# and plays the appropiate animation.
		if direction == 0:
			animated_sprite_2d.play("PlayerWithSword") # plays the idle animation
		else:
			animated_sprite_2d.play("Run") # plays the run animation
			# This if block checks whether the player is moving left or right
			# and it flips the sprite accordingly.
			if direction > 0:
				animated_sprite_2d.flip_h = false
			elif direction < 0:
				animated_sprite_2d.flip_h = true
	else:
		animated_sprite_2d.play("Jump") # plays the jump animation
	move_and_slide()
	
	







func _on_treasure_body_entered(_body):
	get_tree().change_scene_to_file("res://Level2.tscn")


func _on_treasure_body_exited(_body):
	get_tree().change_scene_to_file("res://Scenes/Main_menu.tscn")


func _on_fall_body_entered(_body):
	get_tree().reload_current_scene()


func _on_fake_map_body_entered(_body):
	back_end.decrease_health()

func _on_powerup_area_entered(_area):
	animated_sprite_2d.play("Jump")


