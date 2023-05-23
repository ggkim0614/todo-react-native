import { StatusBar } from 'expo-status-bar';
import uuid from 'react-native-uuid';
import { ChangeEvent, useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	TextInput,
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Keyboard,
	NativeSyntheticEvent,
	TextInputChangeEventData,
} from 'react-native';
import Todo from './components/Todo';

export interface ITodo {
	id: string | number[];
	text: string;
	isComplete: boolean;
}

export default function App() {
	const [todos, setTodos] = useState<ITodo[]>([]);
	const [input, setInput] = useState('');

	const handleInput = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
		const value = e.nativeEvent.text;
		setInput(value);
	};

	const handleAddTodo = () => {
		Keyboard.dismiss();
		if (input === '') {
			return;
		}
		setTodos([...todos, { id: uuid.v4(), text: input, isComplete: false }]);
		setInput('');
	};

	const toggleTodo = (todo: ITodo) => {
		setTodos(
			todos.map((item) =>
				todo.id === item.id ? { ...todo, isComplete: !todo.isComplete } : item
			)
		);
	};

	const deleteTodo = (id: string | number[]) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const completeTodos = todos.filter((todo) => todo.isComplete);

	const incompleteTodos = todos.filter((todo) => !todo.isComplete);

	return (
		<View style={styles.container}>
			<Text style={styles.sectionTitle}>📝 Todos</Text>
			<View style={styles.subHeaderWrap}>
				<Text style={[styles.countNum, styles.incomplete]}>
					{incompleteTodos.length}
				</Text>
				<Text style={styles.subHeader}>Incomplete</Text>
			</View>
			<ScrollView
				style={styles.tasksWrapper}
				keyboardShouldPersistTaps="handled"
			>
				<View style={styles.items}>
					{incompleteTodos.length > 0 ? (
						incompleteTodos.map((todo: ITodo, index) => {
							return (
								<TouchableOpacity key={index}>
									<Todo
										todo={todo}
										toggleTodo={toggleTodo}
										deleteTodo={deleteTodo}
									/>
								</TouchableOpacity>
							);
						})
					) : (
						<View style={styles.emptyWrap}>
							<Text style={styles.emptyPlaceholder}>Add Todos</Text>
						</View>
					)}
				</View>
				<View style={styles.subHeaderWrap}>
					<Text style={[styles.countNum, styles.complete]}>
						{completeTodos.length}
					</Text>
					<Text style={styles.subHeader}>Complete</Text>
				</View>
				<View style={styles.items}>
					{completeTodos.length > 0 ? (
						completeTodos.map((todo: ITodo, index) => {
							return (
								<TouchableOpacity key={index}>
									<Todo
										todo={todo}
										toggleTodo={toggleTodo}
										deleteTodo={deleteTodo}
									/>
								</TouchableOpacity>
							);
						})
					) : (
						<View style={styles.emptyWrap}>
							<Text style={styles.emptyPlaceholder}>Complete Todos</Text>
						</View>
					)}
				</View>
			</ScrollView>

			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.inputWrapper}
			>
				<TextInput
					value={input}
					onChange={(e) => handleInput(e)}
					style={styles.input}
					placeholder="Add todo"
				/>
				<TouchableOpacity onPress={handleAddTodo}>
					<View style={styles.addBtn}>
						<Text style={styles.addText}>✍️</Text>
					</View>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ebe7df',
		paddingHorizontal: 20,
	},
	subHeaderWrap: {
		marginTop: 16,
		marginBottom: 10,
		flexDirection: 'row',
	},
	countNum: {
		marginRight: 8,
		fontSize: 18,
		fontWeight: 'bold',
	},
	incomplete: {
		color: '#f55d42',
	},
	complete: {
		color: '#4ebf11',
	},
	subHeader: { fontSize: 18 },
	emptyWrap: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyPlaceholder: {
		color: '#a3a3a3',
		fontSize: 20,
	},
	tasksWrapper: {},
	sectionTitle: {
		fontSize: 28,
		fontWeight: 'bold',
		paddingTop: 80,
	},
	items: {
		marginTop: 12,
	},
	inputWrapper: {
		paddingHorizontal: 20,
		position: 'absolute',
		bottom: 60,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	input: {
		backgroundColor: '#ffffff',
		width: 260,
		padding: 12,
		fontSize: 16,
		borderRadius: 12,
	},
	addBtn: {
		marginLeft: 24,
		backgroundColor: '#282828',
		borderRadius: 12,
	},
	addText: {
		fontSize: 16,
		padding: 12,
	},
});
