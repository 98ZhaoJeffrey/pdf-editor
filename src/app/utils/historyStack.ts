
class HistoryStack<T> {

    _undoStack: Array<T>
    _redoStack: Array<T>
    maxDepth: number

    constructor(maxDepth: number = 30){
        this._redoStack = [];
        this._undoStack = [];
        this.maxDepth = maxDepth
    }

    /**
     * @returns if undo is possible
     */
    canUndo (): boolean {
        return this._undoStack.length > 0
    }

    /**
     * @returns if redo is possible
     */
    canRedo (): boolean {
        return this._redoStack.length > 0
    }

    /**
     * @returns the action that was redone
     * Redoes the most recent action
     * 
     */
    redo(): T | null {
        const action = this._redoStack.pop()
        if(action){
            if(this._undoStack.length === this.maxDepth){
                this._undoStack.shift()
            }
            this._undoStack.push(action)
            return action
        }
        return null
    }

    /**
     * @returns the action that was undone
     * Undoes the most recent action
     */
    undo(): T | null {
        const action = this._undoStack.pop()
        if(action){
            if(this._redoStack.length === this.maxDepth){
                this._redoStack.shift()
            }
            this._redoStack.push(action)
            return action
        }
        return null
    }

    /**
     * @param T
     * Updates the state when new action occurs
     */
    updateState(action: T): void {
        console.log("updating the current state")
        if(this._undoStack.length === this.maxDepth){
            this._undoStack.shift()
        }
        this._undoStack.push(action)

        console.log('undo', this._undoStack)
    }

}

export default HistoryStack