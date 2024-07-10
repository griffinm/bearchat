class NotesController < ApplicationController
  before_action :authenticate

  def index
    @notes = Note.all
  end

  def show
    @note = Note.find(params[:id])
  end

  def create
    @note = current_user.notes.create
  end

  def update
    @note = Note.find(params[:id])
    @note.update(note_update_params)
  end

  def destroy
    @note = Note.find(params[:id])
    @note.destroy

    render json: { success: true }, status: :ok
  end

  private def note_update_params
    params.require(:note).permit(:title, :content)
  end
end