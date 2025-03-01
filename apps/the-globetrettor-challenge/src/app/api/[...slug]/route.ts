import { NextResponse } from 'next/server';
import { getNewQuestion } from '../../apiControllers/getNewQuestion';
import { checkIfOptionIsCorrect } from '../../apiControllers/checkIfOptionIsCorrect';
import { leaderboardController } from '../../apiControllers/leaderboardController';
import { imageController } from '../../apiControllers/imageController';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { path, payload } = body;

    const actions = {
      '/api/getNewQuestion': getNewQuestion,
      '/api/checkIfOptionIsCorrect': checkIfOptionIsCorrect,
      '/api/updateScore': leaderboardController.updateScore,
      '/api/getLeaderboard': leaderboardController.getLeaderboard,
      '/api/getCityImage': imageController.getCityImage,
    };

    const action = actions[path as keyof typeof actions];
    if (!action) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    const result = await action({ payload });
    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  return NextResponse.json({ message: 'Hello, world!' });
}
