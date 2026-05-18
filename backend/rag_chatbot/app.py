from flask import Flask, request, jsonify
from flask_cors import CORS
from src.helper import download_embeddings
from langchain_pinecone import PineconeVectorStore
from langchain_openai import ChatOpenAI
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from dotenv import load_dotenv
from src.prompt import *
import os

app = Flask(__name__)
CORS(app)

load_dotenv()

PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

os.environ["PINECONE_API_KEY"] = PINECONE_API_KEY
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY

# Load embeddings
embeddings = download_embeddings()

index_name = "healthbuddy-ai-medical-chatbot"

docsearch = PineconeVectorStore.from_existing_index(
    index_name=index_name,
    embedding=embeddings
)

retriever = docsearch.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 3}
)

chatModel = ChatOpenAI(model="gpt-4o")

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "{input}")
    ]
)

question_answer_chain = create_stuff_documents_chain(chatModel, prompt)

rag_chain = create_retrieval_chain(retriever, question_answer_chain)


@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    question = data["question"]

    response = rag_chain.invoke({"input": question})

    return jsonify({
        "answer": response["answer"]
    })
@app.route("/")
def home():
    return "Welcome to the RAG Chatbot API!"

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5004, debug=True)