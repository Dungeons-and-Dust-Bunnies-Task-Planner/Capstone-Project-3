package com.example.capstoneprojectteam3.utils;


public class RandomNumGen {

    public RandomNumGen() {
    }

    public static int GenerateRandomMonsterId(int maximum) {
        int min = 1;
        int max = maximum;
        System.out.println("total monsters:" + max);
        int monsterId = (int) Math.floor(Math.random() * (max - min + 1) + min);
        return monsterId;
    }
}
