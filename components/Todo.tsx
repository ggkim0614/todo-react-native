import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ITodo } from '../App';

type TodoProps = {
	todo: ITodo;
	toggleTodo: (todo: ITodo) => void;
	deleteTodo: (id: string | number[]) => void;
};

const Todo = ({ todo, toggleTodo, deleteTodo }: TodoProps) => {
	return (
		<View style={[styles.todoBody, todo.isComplete && styles.completed]}>
			<View style={styles.leftItems}>
				{todo.isComplete ? (
					<TouchableOpacity onPress={() => toggleTodo(todo)}>
						<Text style={styles.checkIcon}>✅</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						onPress={() => toggleTodo(todo)}
						style={styles.checkBox}
					></TouchableOpacity>
				)}

				<Text style={[styles.todoText, todo.isComplete && styles.completed]}>
					{todo.text}
				</Text>
			</View>
			<TouchableOpacity onPress={() => deleteTodo(todo.id)}>
				<View style={styles.deleteWrap}>
					<Text style={styles.deleteText}>DEL</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	todoBody: {
		marginBottom: 16,
		backgroundColor: '#FFFFFF',
		padding: 12,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#e8e8e8',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	leftItems: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	checkBox: {
		marginRight: 12,
		width: 24,
		height: 24,
		backgroundColor: '#edebe4',
		borderRadius: 6,
	},
	checkIcon: {
		width: 24,
		height: 24,
		marginRight: 12,
		fontSize: 20,
	},
	todoText: {
		fontSize: 16,
		maxWidth: '80%',
	},
	completed: {
		opacity: 0.5,
		textDecorationLine: 'line-through',
	},
	deleteWrap: {
		borderColor: '#f26f63',
		borderWidth: 2,
		borderRadius: 4,
		':hover': {
			backgroundColor: '#f26f63',
		},
	},
	deleteText: {
		fontSize: 12,
		color: '#f26f63',
		fontWeight: 'bold',
		paddingHorizontal: 4,
		paddingVertical: 2,
	},
});

export default Todo;
